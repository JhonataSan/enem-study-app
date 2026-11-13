export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave de API não configurada no servidor.' });
  }

  try {
    const { texto, imagemBase64, mimeType, tema } = req.body;

    if (!texto && !imagemBase64) {
      return res.status(400).json({ error: 'Envie o texto ou a foto da redação.' });
    }

    const promptSistema = `Você é um corretor oficial de redações do ENEM. Avalie a redação enviada seguindo rigorosamente as 5 Competências do ENEM (0 a 200 pontos cada, totalizando 0 a 1000).
${tema ? `Tema proposto: "${tema}"` : 'Identifique o tema abordado pelo texto.'}

Formate sua resposta exatamente nesta estrutura clara e motivadora para um estudante do 2º ano do Ensino Médio:
1. NOTA FINAL ESTIMADA: (Ex: 760 / 1000)
2. TRANSCRIÇÃO (apenas se foi enviada uma foto, transcreva o que conseguiu ler)
3. AVALIAÇÃO POR COMPETÊNCIA (Nota de 0 a 200 + justificativa rápida para C1, C2, C3, C4 e C5)
4. PONTOS FORTES (O que o aluno acertou)
5. O QUE MELHORAR PARA CHEGAR AOS 900+ (Dicas práticas e objetivas)`;

    const parts = [{ text: promptSistema }];

    if (texto) {
      parts.push({ text: `Redação do aluno:\n\n${texto}` });
    }

    if (imagemBase64 && mimeType) {
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: imagemBase64
        }
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro ao comunicar com a IA');
    }

    const resultado = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Não foi possível gerar a correção.';
    return res.status(200).json({ resultado });

  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ error: 'Erro interno ao corrigir a redação. Tente novamente.' });
  }
}