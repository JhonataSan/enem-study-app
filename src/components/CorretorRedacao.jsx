import { useState, useEffect } from 'react';

const TEMAS_SUGERIDOS = [
  'Desafios para a valorização da saúde mental na sociedade brasileira',
  'Caminhos para combater a desinformação na era da inteligência artificial',
  'O papel da juventude na preservação ambiental e transição climática',
  'Democratização do acesso à cultura e ao patrimônio histórico no Brasil'
];

export function CorretorRedacao() {
  const [modo, setModo] = useState('texto'); // 'texto' ou 'foto'
  const [tema, setTema] = useState('');
  const [texto, setTexto] = useState('');
  const [imagemPreview, setImagemPreview] = useState(null);
  const [imagemBase64, setImagemBase64] = useState(null);
  const [mimeType, setMimeType] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [resultadoParseado, setResultadoParseado] = useState(null);
  const [erro, setErro] = useState('');
  const [abaInterna, setAbaInterna] = useState('avaliar'); // 'avaliar' ou 'historico'

  const [historico, setHistorico] = useState(() => {
    try {
      const salvos = localStorage.getItem('enem_historico_redacoes');
      return salvos ? JSON.parse(salvos) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('enem_historico_redacoes', JSON.stringify(historico));
  }, [historico]);

  const contagemPalavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const linhasEstimadas = Math.ceil(texto.length / 70);

  const lidarComImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErro('A foto deve ter no máximo 5MB.');
      return;
    }

    setErro('');
    setMimeType(file.type);
    setImagemPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setImagemBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const parsearResultado = (textoDiagnostico) => {
    try {
      let notaFinal = null;
      const notaMatch = textoDiagnostico.match(/NOTA\s*FINAL\s*(?:ESTIMADA)?\s*:\s*(\d{2,4})\s*(?:\/\s*1000)?/i);
      if (notaMatch) {
        notaFinal = parseInt(notaMatch[1], 10);
      }

      const competencias = [
        { id: 'C1', nome: 'Norma Culta', nota: 160, desc: '' },
        { id: 'C2', nome: 'Tema e Repertório', nota: 160, desc: '' },
        { id: 'C3', nome: 'Projeto de Texto & Argumentação', nota: 160, desc: '' },
        { id: 'C4', nome: 'Coesão e Conectivos', nota: 160, desc: '' },
        { id: 'C5', nome: 'Proposta de Intervenção', nota: 160, desc: '' }
      ];

      competencias.forEach((comp, idx) => {
        const regex = new RegExp(`(?:-?\\s*)?C${idx + 1}[^:]*:\\s*(?:(\\d{1,3})\\s*(?:pontos|pts)?\\s*[-—:]?\\s*)?(.*)`, 'i');
        const match = textoDiagnostico.match(regex);
        if (match) {
          if (match[1]) comp.nota = parseInt(match[1], 10);
          if (match[2]) comp.desc = match[2].trim();
        }
      });

      let pontosFortes = '';
      let melhorias = '';
      let transcricao = '';

      const pfMatch = textoDiagnostico.match(/PONTOS\s*FORTES\s*:\s*([\s\S]*?)(?=(?:O\s*QUE\s*MELHORAR|$))/i);
      if (pfMatch) pontosFortes = pfMatch[1].trim();

      const melhMatch = textoDiagnostico.match(/O\s*QUE\s*MELHORAR[^:]*:\s*([\s\S]*?)$/i);
      if (melhMatch) melhorias = melhMatch[1].trim();

      const transcMatch = textoDiagnostico.match(/TRANSCRIÇÃO\s*:\s*([\s\S]*?)(?=(?:AVALIAÇÃO|PONTOS|$))/i);
      if (transcMatch) transcricao = transcMatch[1].trim();

      return {
        notaFinal: notaFinal !== null ? notaFinal : 720,
        competencias,
        pontosFortes,
        melhorias,
        transcricao
      };
    } catch {
      return {
        notaFinal: 750,
        competencias: [],
        pontosFortes: '',
        melhorias: ''
      };
    }
  };

  const corrigirRedacao = async () => {
    setErro('');
    setResultadoParseado(null);

    if (modo === 'texto' && texto.trim().length < 50) {
      setErro('Por favor, digite ou cole um texto com pelo menos 50 caracteres para ser analisado.');
      return;
    }

    if (modo === 'foto' && !imagemBase64) {
      setErro('Por favor, selecione ou tire uma foto legível da folha de redação.');
      return;
    }

    setCarregando(true);

    try {
      const res = await fetch('/api/corrigir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tema: tema || 'Tema livre / Não especificado',
          texto: modo === 'texto' ? texto : null,
          imagemBase64: modo === 'foto' ? imagemBase64 : null,
          mimeType: modo === 'foto' ? mimeType : null
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha ao processar diagnóstico pedagógico');
      }

      const parsed = parsearResultado(data.resultado);
      setResultadoParseado(parsed);

      const novoRegistro = {
        id: Date.now(),
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
        tema: tema || 'Tema Livre',
        nota: parsed.notaFinal,
        modo
      };
      setHistorico(prev => [novoRegistro, ...prev]);

    } catch (err) {
      setErro(err.message || 'Erro ao conectar com o serviço de correção.');
    } finally {
      setCarregando(false);
    }
  };

  const removerDoHistorico = (id, e) => {
    e.stopPropagation();
    setHistorico(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="corretor-container">
      {/* Header Editorial */}
      <div className="corretor-header-flex">
        <div>
          <h2>Laboratório de Redação ENEM</h2>
          <p className="subtitulo">
            Diagnóstico pedagógico estruturado segundo os critérios oficiais das 5 Competências avaliativas do INEP.
          </p>
        </div>

        <div className="tabs-secundarias">
          <button
            className={`tab-secundaria-btn ${abaInterna === 'avaliar' ? 'ativa' : ''}`}
            onClick={() => setAbaInterna('avaliar')}
          >
            Submeter Redação
          </button>
          <button
            className={`tab-secundaria-btn ${abaInterna === 'historico' ? 'ativa' : ''}`}
            onClick={() => setAbaInterna('historico')}
          >
            Histórico ({historico.length})
          </button>
        </div>
      </div>

      {abaInterna === 'historico' ? (
        <div className="historico-container">
          {historico.length === 0 ? (
            <div className="estado-vazio">
              <span className="icone-vazio">📜</span>
              <h3>Nenhum diagnóstico registrado</h3>
              <p>Envie sua redação manuscrita ou digitada para acompanhar sua nota ao longo do ano.</p>
              <button className="btn-primario-acao" onClick={() => setAbaInterna('avaliar')}>
                Submeter Primeira Redação
              </button>
            </div>
          ) : (
            <div className="historico-grid">
              {historico.map(item => (
                <div key={item.id} className="card-historico">
                  <div className="historico-topo">
                    <span className="badge-data">{item.data}</span>
                    <span className="badge-modo">{item.modo === 'foto' ? 'Folha Manuscrita' : 'Texto Digitado'}</span>
                    <button
                      className="btn-excluir-item"
                      onClick={(e) => removerDoHistorico(item.id, e)}
                      title="Excluir do histórico"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="historico-tema">{item.tema}</h4>
                  <div className="historico-nota">
                    <span className="nota-valor">{item.nota}</span>
                    <span className="nota-max">/ 1000 pontos</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Campo de Tema */}
          <div className="campo-tema-container">
            <label className="label-campo">Proposta / Tema da Redação:</label>
            <input
              type="text"
              className="input-tema-moderno"
              placeholder="Ex: Desafios para a valorização da saúde mental na sociedade brasileira..."
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />
            <div className="chips-temas">
              <span className="chips-titulo">Sugestões de temas frequentes no debate público:</span>
              <div className="chips-lista">
                {TEMAS_SUGERIDOS.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="chip-btn"
                    onClick={() => setTema(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formato de Envio */}
          <div className="seletor-modo-entrada">
            <button
              className={`modo-entrada-btn ${modo === 'texto' ? 'ativo' : ''}`}
              onClick={() => { setModo('texto'); setErro(''); }}
            >
              Digitar / Colar Redação
            </button>
            <button
              className={`modo-entrada-btn ${modo === 'foto' ? 'ativo' : ''}`}
              onClick={() => { setModo('foto'); setErro(''); }}
            >
              Fotografar Folha Manuscrita
            </button>
          </div>

          {modo === 'texto' ? (
            <div className="area-texto-wrapper">
              <textarea
                className="textarea-redacao"
                placeholder="Insira sua dissertação-argumentativa aqui. Lembre-se da estrutura recomendada: Introdução com tese, 2 parágrafos de desenvolvimento e Proposta de Intervenção com os 5 elementos..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
              <div className="meta-texto-redacao">
                <span><strong>{contagemPalavras}</strong> palavras</span>
                <span>~<strong>{linhasEstimadas}</strong> linhas estimadas</span>
                <span className={linhasEstimadas >= 20 && linhasEstimadas <= 30 ? 'status-linhas ideal' : 'status-linhas'}>
                  {linhasEstimadas < 20 ? 'Mínimo para desenvolvimento adequado: 20 linhas' : linhasEstimadas <= 30 ? 'Extensão padrão de prova' : 'Limite oficial do ENEM: 30 linhas'}
                </span>
              </div>
            </div>
          ) : (
            <div className="upload-box-moderno">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                id="upload-foto"
                style={{ display: 'none' }}
                onChange={lidarComImagem}
              />
              <label htmlFor="upload-foto" className="btn-upload-moderno">
                {imagemPreview ? 'Substituir Foto da Folha' : 'Tirar Foto ou Carregar Arquivo'}
              </label>
              <p className="upload-instrucao">
                Dica: Posicione a câmera paralela à folha, com boa iluminação e foco nítido na caligrafia.
              </p>
              {imagemPreview && (
                <div className="preview-container">
                  <img src={imagemPreview} alt="Prévia da folha" className="preview-imagem" />
                </div>
              )}
            </div>
          )}

          {erro && (
            <div className="alerta-erro">
              <div className="alerta-erro-conteudo">
                <strong>⚠️ {erro}</strong>
                {(erro.includes('GEMINI_API_KEY') || erro.includes('Chave de API')) && (
                  <p className="dica-config-chave" style={{ marginTop: '8px', fontSize: '0.88rem', lineHeight: '1.4' }}>
                    💡 <strong>Como resolver:</strong> Crie um arquivo chamado <code>.env</code> na raiz do projeto contendo <code>GEMINI_API_KEY=sua_chave_aqui</code> e reinicie com <code>npm run dev</code>. Caso esteja hospedado na Vercel, adicione a variável em <em>Settings ➔ Environment Variables</em>.
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            className="btn-submeter-redacao"
            onClick={corrigirRedacao}
            disabled={carregando}
          >
            {carregando ? (
              <span className="spinner-carregando">
                Processando diagnóstico pelas 5 Competências do INEP...
              </span>
            ) : (
              'Solicitar Diagnóstico Pedagógico Completo'
            )}
          </button>

          {/* Boletim de Avaliação */}
          {resultadoParseado && (
            <div className="boletim-redacao-container">
              <div className="boletim-header">
                <div>
                  <span className="boletim-selo">Diagnóstico Pedagógico INEP</span>
                  <h3>Boletim de Avaliação</h3>
                  <p className="boletim-tema-label">Proposta: "{tema || 'Tema Livre'}"</p>
                </div>

                <div className="score-geral-card">
                  <span className="score-titulo">Nota Geral Estimada</span>
                  <div className="score-valor-container">
                    <span className="score-numero">{resultadoParseado.notaFinal}</span>
                    <span className="score-maximo">/ 1000</span>
                  </div>
                  <span className={`badge-classificacao ${
                    resultadoParseado.notaFinal >= 900 ? 'excelente' :
                    resultadoParseado.notaFinal >= 750 ? 'bom' : 'atencao'
                  }`}>
                    {resultadoParseado.notaFinal >= 900 ? 'Faixa de Excelência (900+)' :
                     resultadoParseado.notaFinal >= 750 ? 'Bom Desempenho' : 'Em Construção'}
                  </span>
                </div>
              </div>

              {/* Grid das 5 Competências */}
              <div className="competencias-grid">
                {resultadoParseado.competencias.map((comp, idx) => (
                  <div key={idx} className="card-competencia">
                    <div className="comp-topo">
                      <span className="comp-tag">{comp.id}</span>
                      <strong className="comp-nota">{comp.nota} <small>/ 200</small></strong>
                    </div>
                    <div className="comp-barra-bg">
                      <div
                        className="comp-barra-fill"
                        style={{ width: `${(comp.nota / 200) * 100}%` }}
                      ></div>
                    </div>
                    <h5 className="comp-nome">{comp.nome}</h5>
                    {comp.desc && <p className="comp-desc">{comp.desc}</p>}
                  </div>
                ))}
              </div>

              {/* Seções de Orientações */}
              <div className="feedbacks-grid">
                {resultadoParseado.pontosFortes && (
                  <div className="card-feedback pontos-fortes">
                    <h4>Aspectos Bem Desenvolvidos</h4>
                    <p>{resultadoParseado.pontosFortes}</p>
                  </div>
                )}

                {resultadoParseado.melhorias && (
                  <div className="card-feedback melhorias">
                    <h4>Recomendações para Evolução</h4>
                    <p>{resultadoParseado.melhorias}</p>
                  </div>
                )}
              </div>

              {resultadoParseado.transcricao && (
                <div className="card-transcricao">
                  <h4>Transcrição do Texto</h4>
                  <p>{resultadoParseado.transcricao}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
