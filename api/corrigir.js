export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave de API (GEMINI_API_KEY) não configurada no servidor.' });
  }

  try {
    const { texto, imagemBase64, mimeType, tema } = req.body;

    if (!texto && !imagemBase64) {
      return res.status(400).json({ error: 'Envie o texto digitado ou a foto da redação.' });
    }

    const promptSistema = `Você é um corretor oficial de redações do ENEM. Avalie a redação enviada seguindo rigorosamente a matriz de referência do INEP com as 5 Competências do ENEM (cada uma valendo de 0 a 200 pontos, totalizando de 0 a 1000 pontos).
${tema ? `Tema proposto: "${tema}"` : 'Identifique o tema abordado pelo texto do aluno.'}

IMPORTANTE: Não use formatação Markdown na resposta (não use asteriscos **, traços longos ou cerquilhas #). Use apenas texto limpo, títulos em maiúsculas e quebras de linha.

Formate sua resposta rigorosamente nesta estrutura:

NOTA FINAL ESTIMADA: [pontos de 0 a 1000] / 1000

TRANSCRIÇÃO: (apenas se foi enviada uma foto, transcreva o texto lido; se foi texto digitado, omita esta seção)

AVALIAÇÃO POR COMPETÊNCIA:
- C1 (Norma Culta): [nota de 0 a 200] pontos - [justificativa detalhada com desvios encontrados]
- C2 (Tema e Repertório): [nota de 0 a 200] pontos - [análise da tese, repertório legitimado e tipologia textual]
- C3 (Projeto de Texto e Argumentação): [nota de 0 a 200] pontos - [organização dos argumentos e coerência]
- C4 (Coesão e Conectivos): [nota de 0 a 200] pontos - [análise dos conectivos inter e intraparágrafos]
- C5 (Proposta de Intervenção): [nota de 0 a 200] pontos - [presença dos 5 elementos: agente, ação, meio, efeito e detalhamento]

PONTOS FORTES:
(Liste em tópicos curtos o que o estudante fez de melhor na estrutura e no conteúdo)

O QUE MELHORAR PARA CHEGAR AOS 900+:
(Dicas práticas, estratégicas e diretas para o estudante do 2º ano do Ensino Médio evoluir)`;

    const parts = [{ text: promptSistema }];

    if (texto) {
      parts.push({ text: `Redação do aluno para correção:\n\n${texto}` });
    }

    if (imagemBase64 && mimeType) {
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: imagemBase64
        }
      });
    }

    // Tenta primeiro com gemini-2.5-flash; caso não esteja disponível, usa fallback para gemini-1.5-flash
    const modelos = ['gemini-2.5-flash', 'gemini-1.5-flash'];
    let resultado = null;
    let ultimoErro = null;

    for (const modelo of modelos) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts }]
            })
          }
        );

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          resultado = data.candidates[0].content.parts[0].text;
          break;
        } else {
          ultimoErro = data.error?.message || `Erro no modelo ${modelo}`;
        }
      } catch (err) {
        ultimoErro = err.message;
      }
    }

    if (!resultado) {
      throw new Error(ultimoErro || 'Não foi possível obter a correção da IA.');
    }

    return res.status(200).json({ resultado });

  } catch (error) {
    console.error('Erro na API de correção:', error);
    return res.status(500).json({ error: error.message || 'Erro interno ao processar correção.' });
  }
}
