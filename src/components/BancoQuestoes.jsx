import { useState, useMemo } from 'react';
import { cadernosRevisao, questoesRevisao, linksProvasOficiais } from '../data/bancoQuestoes';

export function BancoQuestoes() {
  const [cadernoAtivo, setCadernoAtivo] = useState('todos');
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [confirmadas, setConfirmadas] = useState({});
  const [mostrarResolucao, setMostrarResolucao] = useState({});

  const questoesFiltradas = useMemo(() => {
    if (cadernoAtivo === 'todos') return questoesRevisao;
    return questoesRevisao.filter(q => q.cadernoId === cadernoAtivo);
  }, [cadernoAtivo]);

  const selecionarAlternativa = (questaoId, letra) => {
    if (confirmadas[questaoId]) return;
    setRespostasUsuario(prev => ({
      ...prev,
      [questaoId]: letra
    }));
  };

  const confirmarResposta = (questaoId) => {
    if (!respostasUsuario[questaoId]) return;
    setConfirmadas(prev => ({
      ...prev,
      [questaoId]: true
    }));
  };

  const alternarResolucao = (questaoId) => {
    setMostrarResolucao(prev => ({
      ...prev,
      [questaoId]: !prev[questaoId]
    }));
  };

  const reiniciarRespostas = () => {
    if (window.confirm('Deseja reiniciar todas as respostas deste treino de revisão?')) {
      setRespostasUsuario({});
      setConfirmadas({});
      setMostrarResolucao({});
    }
  };

  // Estatísticas de desempenho do caderno atual
  const questoesCadernoIds = questoesFiltradas.map(q => q.id);
  const confirmadasNoCaderno = questoesCadernoIds.filter(id => confirmadas[id]);
  const totalConfirmadas = confirmadasNoCaderno.length;
  const acertos = confirmadasNoCaderno.filter(id => {
    const q = questoesRevisao.find(item => item.id === id);
    return q && respostasUsuario[id] === q.correta;
  }).length;
  const taxaAcerto = totalConfirmadas > 0 ? Math.round((acertos / totalConfirmadas) * 100) : 0;

  const cadernoAtualInfo = cadernosRevisao.find(c => c.id === cadernoAtivo);

  return (
    <div className="banco-questoes-container">
      {/* Cabeçalho */}
      <div className="banco-header-clean">
        <div>
          <h2>Revisão Geral do ENEM: Os Grandes Eixos</h2>
          <p className="subtitulo">
            Itens reais selecionados a partir dos temas de maior recorrência histórica nas 4 áreas do conhecimento do exame.
          </p>
        </div>

        {totalConfirmadas > 0 && (
          <div className="placar-treino-compacto">
            <div className="placar-item">
              <span className="placar-num cor-acerto">{acertos}</span>
              <span className="placar-label">Acertos</span>
            </div>
            <div className="placar-divisor">/</div>
            <div className="placar-item">
              <span className="placar-num">{totalConfirmadas}</span>
              <span className="placar-label">Respondidas</span>
            </div>
            <div className="placar-divisor">•</div>
            <div className="placar-item">
              <span className="placar-num">{taxaAcerto}%</span>
              <span className="placar-label">Aproveitamento</span>
            </div>
            <button className="btn-reiniciar-treino" onClick={reiniciarRespostas} title="Limpar respostas deste caderno">
              ↺
            </button>
          </div>
        )}
      </div>

      {/* Seletor dos 4 Cadernos de Revisão Oficial */}
      <div className="seletor-cadernos-grid">
        <button
          className={`card-caderno-opcao ${cadernoAtivo === 'todos' ? 'ativo' : ''}`}
          onClick={() => setCadernoAtivo('todos')}
        >
          <div className="caderno-topo-info">
            <span className="caderno-icone">🌟</span>
            <span className="caderno-dia-tag">Simulado Geral</span>
          </div>
          <h4>Todas as Áreas</h4>
          <span className="caderno-qtd">{questoesRevisao.length} questões selecionadas</span>
        </button>

        {cadernosRevisao.map(cad => (
          <button
            key={cad.id}
            className={`card-caderno-opcao ${cadernoAtivo === cad.id ? 'ativo' : ''}`}
            onClick={() => setCadernoAtivo(cad.id)}
          >
            <div className="caderno-topo-info">
              <span className="caderno-icone">{cad.icone}</span>
              <span className="caderno-dia-tag">{cad.diaProva}</span>
            </div>
            <h4>{cad.nome}</h4>
            <span className="caderno-qtd">{cad.subtitulo}</span>
          </button>
        ))}
      </div>

      {/* Painel de Temas de Alta Recorrência da Área Selecionada */}
      {cadernoAtualInfo && (
        <div className="banner-temas-recorrentes">
          <span className="label-temas-rec">📌 Temas mais cobrados nesta área:</span>
          <div className="chips-temas-rec-grid">
            {cadernoAtualInfo.temasFrequentes.map((t, idx) => (
              <span key={idx} className="chip-tema-frequente">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Questões do Caderno */}
      <div className="lista-questoes-container">
        {questoesFiltradas.map((q) => {
          const respondida = !!confirmadas[q.id];
          const marcada = respostasUsuario[q.id];
          const acertou = respondida && marcada === q.correta;

          return (
            <div key={q.id} className={`card-questao-moderno ${respondida ? (acertou ? 'correta' : 'incorreta') : ''}`}>
              <div className="questao-topo-tags">
                <div className="tags-esquerda">
                  <span className="tag-ano">ENEM {q.ano}</span>
                  <span className="tag-disciplina">{q.disciplina}</span>
                  <span className="tag-topico">{q.topico}</span>
                </div>
                {q.recorrencia && (
                  <span className="tag-recorrencia-destaque">⭐ {q.recorrencia}</span>
                )}
              </div>

              <div className="questao-corpo-enunciado">
                <p>{q.enunciado}</p>
              </div>

              <div className="alternativas-grid-clean">
                {q.alternativas.map(alt => {
                  const estaMarcada = marcada === alt.letra;
                  let classeAlt = 'alternativa-btn';
                  if (estaMarcada) classeAlt += ' marcada';
                  if (respondida) {
                    if (alt.letra === q.correta) classeAlt += ' gabarito-certo';
                    else if (estaMarcada && alt.letra !== q.correta) classeAlt += ' gabarito-errado';
                  }

                  return (
                    <button
                      key={alt.letra}
                      type="button"
                      disabled={respondida}
                      className={classeAlt}
                      onClick={() => selecionarAlternativa(q.id, alt.letra)}
                    >
                      <span className="letra-badge">{alt.letra}</span>
                      <span className="texto-alternativa">{alt.texto}</span>
                    </button>
                  );
                })}
              </div>

              <div className="questao-rodape-acoes">
                {!respondida ? (
                  <button
                    className="btn-confirmar-resposta"
                    disabled={!marcada}
                    onClick={() => confirmarResposta(q.id)}
                  >
                    Confirmar Resposta
                  </button>
                ) : (
                  <div className="resultado-feedback-bloco">
                    <span className={`status-resposta-badge ${acertou ? 'acertou' : 'errou'}`}>
                      {acertou ? '✓ Resposta Correta' : `✗ Incorreta (Gabarito Oficial: Letra ${q.correta})`}
                    </span>

                    <button
                      className="btn-toggle-resolucao"
                      onClick={() => alternarResolucao(q.id)}
                    >
                      {mostrarResolucao[q.id] ? 'Fechar Resolução' : 'Ver Resolução Pedagógica'}
                    </button>
                  </div>
                )}
              </div>

              {mostrarResolucao[q.id] && (
                <div className="box-resolucao-pedagogica">
                  <strong>Resolução Comentada Oficial:</strong>
                  <p>{q.resolucao}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Estante de Downloads Oficiais do INEP */}
      <div className="secao-provas-inep">
        <div className="provas-inep-header">
          <div>
            <h4>Estante Oficial de Provas & Gabaritos em PDF (MEC / INEP)</h4>
            <p>
              Baixe os cadernos originais de prova completos (Azul, Amarelo, Branco e Rosa) com seus respectivos gabaritos oficiais diretamente do portal público do INEP:
            </p>
          </div>
        </div>
        <div className="links-provas-grid">
          {linksProvasOficiais.map(p => (
            <a
              key={p.ano}
              href={p.linkInep}
              target="_blank"
              rel="noopener noreferrer"
              className="link-prova-card"
            >
              <div className="prova-card-info">
                <span className="ano-prova-tag">{p.titulo}</span>
                <span className="prova-dias-sub">Cadernos Dia 1 & Dia 2 em PDF</span>
              </div>
              <span className="icone-download-link">Abrir no INEP ↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
