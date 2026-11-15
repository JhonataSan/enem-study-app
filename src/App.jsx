import { useState, useEffect, useMemo } from 'react';
import { enemTopics } from './data/enemTopics';
import { Cronograma } from './components/Cronograma';
import { Pomodoro } from './components/Pomodoro';
import { CorretorRedacao } from './components/CorretorRedacao';
import { BancoQuestoes } from './components/BancoQuestoes';
import { SobreProjeto } from './components/SobreProjeto';
import { ModalPerfil } from './components/ModalPerfil';
import { CURSOS_COM_PRIORIDADES } from './data/perfilData';
import './App.css';

// Calcula a contagem regressiva para o ENEM (primeiro domingo de Novembro)
function calcularDiasAteEnem() {
  const agora = new Date();
  const anoAtual = agora.getFullYear();
  let dataEnem = new Date(anoAtual, 10, 1);
  while (dataEnem.getDay() !== 0) {
    dataEnem.setDate(dataEnem.getDate() + 1);
  }
  if (agora > dataEnem) {
    dataEnem = new Date(anoAtual + 1, 10, 1);
    while (dataEnem.getDay() !== 0) {
      dataEnem.setDate(dataEnem.getDate() + 1);
    }
  }
  const diffMs = dataEnem.getTime() - agora.getTime();
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

// Formata o nome da área de conhecimento de forma legível e sem ambiguidades
function formatarNomeArea(nomeArea) {
  const nome = (nomeArea || '').toLowerCase();
  if (nome.includes('natureza')) return 'C. da Natureza';
  if (nome.includes('humanas')) return 'C. Humanas';
  if (nome.includes('matemática')) return 'Matemática';
  if (nome.includes('linguagens')) return 'Linguagens';
  return nomeArea;
}

// Verifica se a área de conhecimento é foco estratégico para o curso escolhido no SISU
function ehAreaPrioritaria(nomeArea, areaFoco) {
  if (!areaFoco || !nomeArea) return false;
  const foco = areaFoco.toLowerCase();
  const area = nomeArea.toLowerCase();

  if (area.includes('natureza')) {
    return foco.includes('natureza') || foco.includes('biologia') || foco.includes('química') || foco.includes('física');
  }
  if (area.includes('humanas')) {
    return foco.includes('humanas') || foco.includes('história') || foco.includes('geografia') || foco.includes('filosofia') || foco.includes('sociologia');
  }
  if (area.includes('matemática')) {
    return foco.includes('matemática');
  }
  if (area.includes('linguagens')) {
    return foco.includes('linguagens') || foco.includes('redação');
  }
  return false;
}

function App() {
  const [abaPrincipal, setAbaPrincipal] = useState('conteudos');
  const [areaAtiva, setAreaAtiva] = useState(0);
  const [termoBusca, setTermoBusca] = useState('');
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);

  const [perfilAluno, setPerfilAluno] = useState(() => {
    try {
      const salvos = localStorage.getItem('enem_perfil_aluno');
      return salvos
        ? JSON.parse(salvos)
        : {
            nome: '',
            avatar: '🦉',
            cursoAlvo: '',
            anoEscolar: '2º ano do Ensino Médio',
            metaNota: '800+',
            fraseMotivacional: 'Construindo minha aprovação dia após dia.'
          };
    } catch {
      return {
        nome: '',
        avatar: '🦉',
        cursoAlvo: '',
        anoEscolar: '2º ano do Ensino Médio',
        metaNota: '800+',
        fraseMotivacional: 'Construindo minha aprovação dia após dia.'
      };
    }
  });

  const [tema, setTema] = useState(() => {
    return localStorage.getItem('enem_tema') || 'light';
  });

  // Estado ao vivo do Pomodoro para manter contador no cabeçalho em qualquer aba
  const [pomodoroLive, setPomodoroLive] = useState({
    ativo: false,
    minutos: 25,
    segundos: 0,
    modo: 'estudo'
  });

  useEffect(() => {
    const lidarPomodoro = (e) => {
      if (e.detail) {
        setPomodoroLive(e.detail);
      }
    };
    window.addEventListener('pomodoro_update', lidarPomodoro);
    return () => window.removeEventListener('pomodoro_update', lidarPomodoro);
  }, []);

  const [concluidos, setConcluidos] = useState(() => {
    try {
      const salvos = localStorage.getItem('enem_topicos_concluidos');
      return salvos ? JSON.parse(salvos) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('enem_tema', tema);
  }, [tema]);

  useEffect(() => {
    localStorage.setItem('enem_topicos_concluidos', JSON.stringify(concluidos));
  }, [concluidos]);

  useEffect(() => {
    localStorage.setItem('enem_perfil_aluno', JSON.stringify(perfilAluno));
  }, [perfilAluno]);

  const alternarTema = () => {
    setTema(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const alternarTopico = (topico) => {
    setConcluidos(prev => ({
      ...prev,
      [topico]: !prev[topico]
    }));
  };

  const salvarPerfil = (novosDados) => {
    setPerfilAluno(novosDados);
  };

  const { totalTopicos, totalConcluidos, percentualGeral, progressoPorArea } = useMemo(() => {
    let total = 0;
    let concl = 0;
    const areas = [];

    enemTopics.forEach((area, aIndex) => {
      let areaTotal = 0;
      let areaConcl = 0;

      area.materias.forEach(materia => {
        materia.topicos.forEach(topico => {
          total++;
          areaTotal++;
          if (concluidos[topico]) {
            concl++;
            areaConcl++;
          }
        });
      });

      const areaPct = areaTotal > 0 ? Math.round((areaConcl / areaTotal) * 100) : 0;
      areas.push({
        index: aIndex,
        area: area.area,
        icone: area.icone,
        total: areaTotal,
        concluidos: areaConcl,
        pct: areaPct
      });
    });

    const pct = total > 0 ? Math.round((concl / total) * 100) : 0;

    return {
      totalTopicos: total,
      totalConcluidos: concl,
      percentualGeral: pct,
      progressoPorArea: areas
    };
  }, [concluidos]);

  const redacoesAvaliadas = useMemo(() => {
    try {
      const red = localStorage.getItem('enem_historico_redacoes');
      return red ? JSON.parse(red).length : 0;
    } catch {
      return 0;
    }
  }, []);

  const diasAteEnem = useMemo(() => calcularDiasAteEnem(), []);

  const materiasFiltradas = useMemo(() => {
    const materiasAtuais = enemTopics[areaAtiva].materias;
    if (!termoBusca.trim()) return materiasAtuais;

    const termo = termoBusca.toLowerCase();
    return materiasAtuais.map(m => {
      const topicosMatch = m.topicos.filter(t => t.toLowerCase().includes(termo));
      return {
        ...m,
        topicos: topicosMatch
      };
    }).filter(m => m.topicos.length > 0);
  }, [areaAtiva, termoBusca]);

  // Informações de prioridade do curso do aluno
  const prioridadeCurso = CURSOS_COM_PRIORIDADES[perfilAluno.cursoAlvo] || null;

  return (
    <div className="layout-app">
      {/* Barra de Navegação Superior Integrada & Limpa */}
      <header className="navbar-superior">
        <div className="navbar-container">
          <div className="navbar-marca">
            <h1 className="logo-texto" onClick={() => setAbaPrincipal('conteudos')}>
              Aprova<span>ENEM</span>
            </h1>
            <span className="badge-univ-clean">UNINASSAU</span>
          </div>

          <div className="navbar-acoes">
            {/* Indicador ao vivo do Pomodoro quando o timer está rodando e o aluno está em outra aba */}
            {pomodoroLive.ativo && abaPrincipal !== 'pomodoro' && (
              <button
                type="button"
                className="pill-pomodoro-header-live"
                onClick={() => setAbaPrincipal('pomodoro')}
                title="Sessão de estudos em andamento! Clique para abrir o Timer Pomodoro"
              >
                <span className="dot-pulso-pomodoro"></span>
                <span className="texto-tempo-pomodoro">
                  ⏱️ {String(pomodoroLive.minutos).padStart(2, '0')}:{String(pomodoroLive.segundos).padStart(2, '0')} ({pomodoroLive.modo === 'estudo' ? 'Foco' : 'Pausa'})
                </span>
              </button>
            )}

            {/* Botão de Perfil Personalizado com Avatar */}
            <button
              className={`pill-perfil-btn ${perfilAluno.nome ? 'configurado' : ''}`}
              onClick={() => setModalPerfilAberto(true)}
              title="Personalizar meu perfil e ver minha carteirinha"
            >
              <span className="icone-perfil-emoji">{perfilAluno.avatar || '🦉'}</span>
              <span className="texto-perfil">
                {perfilAluno.nome
                  ? `${perfilAluno.nome}${perfilAluno.cursoAlvo ? ` (${perfilAluno.cursoAlvo.split(' ')[0]})` : ''}`
                  : 'Criar Meu Perfil'}
              </span>
            </button>

            <div className="pill-countdown-topo" title="Contagem regressiva aproximada para a prova do ENEM">
              <span className="countdown-dias-destaque">{diasAteEnem}</span>
              <span className="countdown-txt">dias p/ o ENEM</span>
            </div>

            <button
              className="btn-tema-minimal"
              onClick={alternarTema}
              title={tema === 'light' ? 'Ativar Modo Noturno' : 'Ativar Modo Claro'}
            >
              {tema === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <div className="container-principal">
        {/* Banner de Boas-Vindas Pessoal & Progresso */}
        {abaPrincipal !== 'sobre' && (
          <div className="banner-boas-vindas-pessoal">
            <div className="boas-vindas-corpo">
              <div className="avatar-destaque-banner" onClick={() => setModalPerfilAberto(true)}>
                {perfilAluno.avatar || '🦉'}
              </div>
              <div className="boas-vindas-textos">
                <div className="boas-vindas-linha-topo">
                  <h3>
                    {perfilAluno.nome ? (
                      <>Olá, <strong>{perfilAluno.nome}</strong>! Rumo a <strong>{perfilAluno.cursoAlvo || 'sua aprovação'}</strong></>
                    ) : (
                      <>Olá, vestibulando(a)! Configure seu perfil de estudos</>
                    )}
                  </h3>
                  <button className="btn-editar-perfil-inline" onClick={() => setModalPerfilAberto(true)}>
                    ✎ Editar Perfil
                  </button>
                </div>

                <p className="frase-lema-aluno">
                  "{perfilAluno.fraseMotivacional || 'Construindo minha aprovação dia após dia.'}"
                </p>

                {prioridadeCurso && (
                  <div className="chip-foco-estrategico">
                    <span className="chip-foco-rotulo">Foco do seu curso no SISU:</span>
                    <strong>{prioridadeCurso.areaFoco}</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="barra-progresso-integrada">
              <div className="progresso-aluno-info">
                <span>Edital Estudado: <strong>{totalConcluidos} de {totalTopicos} tópicos</strong></span>
                <span className="progresso-status-tag">{percentualGeral}% dominado</span>
              </div>
              <div className="trilha-bg-progresso">
                <div className="trilha-fill-progresso" style={{ width: `${percentualGeral}%` }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Menu de Abas Limpo e Fino */}
        <nav className="nav-abas-clean">
          <button
            className={`item-aba-nav ${abaPrincipal === 'conteudos' ? 'ativo' : ''}`}
            onClick={() => setAbaPrincipal('conteudos')}
          >
            Edital
          </button>
          <button
            className={`item-aba-nav ${abaPrincipal === 'cronograma' ? 'ativo' : ''}`}
            onClick={() => setAbaPrincipal('cronograma')}
          >
            Planner Semanal
          </button>
          <button
            className={`item-aba-nav ${abaPrincipal === 'questoes' ? 'ativo' : ''}`}
            onClick={() => setAbaPrincipal('questoes')}
          >
            Banco de Questões
          </button>
          <button
            className={`item-aba-nav ${abaPrincipal === 'redacao' ? 'ativo' : ''}`}
            onClick={() => setAbaPrincipal('redacao')}
          >
            Laboratório de Redação
          </button>
          <button
            className={`item-aba-nav ${abaPrincipal === 'pomodoro' ? 'ativo' : ''}`}
            onClick={() => setAbaPrincipal('pomodoro')}
          >
            Timer Pomodoro
          </button>
          <button
            className={`item-aba-nav ${abaPrincipal === 'sobre' ? 'ativo' : ''}`}
            onClick={() => setAbaPrincipal('sobre')}
          >
            Sobre o Projeto
          </button>
        </nav>

        {/* =========================================================================
            ABA 1: EDITAL ESQUEMATIZADO
        ========================================================================= */}
        {abaPrincipal === 'conteudos' && (
          <div className="modulo-conteudos">
            <div className="areas-resumo-grid">
              {progressoPorArea.map((pArea) => {
                const ehPrioridadeCurso = ehAreaPrioritaria(pArea.area, prioridadeCurso?.areaFoco);

                return (
                  <div
                    key={pArea.index}
                    className={`card-area-resumo ${areaAtiva === pArea.index ? 'selecionada' : ''} ${ehPrioridadeCurso ? 'area-prioritaria-curso' : ''}`}
                    onClick={() => setAreaAtiva(pArea.index)}
                  >
                    <div className="area-resumo-header">
                      <div className="area-header-esquerda">
                        <span className="area-nome-curto">{formatarNomeArea(pArea.area)}</span>
                        {ehPrioridadeCurso && <span className="badge-prioridade-chip" title="Área de maior peso para o seu curso alvo">⭐ Foco</span>}
                      </div>
                      <strong className="area-pct">{pArea.pct}%</strong>
                    </div>
                    <div className="barra-bg-mini">
                      <div className="barra-fill-mini" style={{ width: `${pArea.pct}%` }}></div>
                    </div>
                    <span className="area-contagem">{pArea.concluidos}/{pArea.total} concluídos</span>
                  </div>
                );
              })}
            </div>

            <div className="area-selecionada-painel">
              <div className="area-info-cabecalho">
                <div className="area-titulo-com-icone">
                  <div>
                    <h3>{enemTopics[areaAtiva].area}</h3>
                    <p>{enemTopics[areaAtiva].descricao}</p>
                  </div>
                </div>

                <div className="campo-busca-topicos">
                  <input
                    type="text"
                    placeholder="Filtrar tópicos desta matéria..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                  />
                  {termoBusca && (
                    <button className="btn-limpar-busca" onClick={() => setTermoBusca('')}>✕</button>
                  )}
                </div>
              </div>

              {materiasFiltradas.length === 0 ? (
                <div className="estado-vazio-busca">
                  <p>Nenhum tópico encontrado para o filtro "{termoBusca}".</p>
                </div>
              ) : (
                materiasFiltradas.map((materia, mIndex) => (
                  <div key={mIndex} className="card-materia-moderno">
                    <div className="materia-topo">
                      <h4>{materia.nome}</h4>
                      <span className="materia-badge-qtd">{materia.topicos.length} tópicos</span>
                    </div>

                    <ul className="lista-topicos-moderna">
                      {materia.topicos.map((topico, tIndex) => {
                        const estaFeito = !!concluidos[topico];
                        return (
                          <li key={tIndex} className={`item-topico ${estaFeito ? 'concluido' : ''}`}>
                            <label className="checkbox-container">
                              <input
                                type="checkbox"
                                checked={estaFeito}
                                onChange={() => alternarTopico(topico)}
                              />
                              <span className="texto-topico">{topico}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            ABA 2: CALENDÁRIO DE ESTUDOS
        ========================================================================= */}
        {abaPrincipal === 'cronograma' && (
          <Cronograma
            perfilAluno={perfilAluno}
            concluidosEdital={concluidos}
          />
        )}

        {/* =========================================================================
            ABA 3: BANCO DE QUESTÕES & PROVAS DO INEP
        ========================================================================= */}
        {abaPrincipal === 'questoes' && <BancoQuestoes />}

        {/* =========================================================================
            ABA 4: LABORATÓRIO DE REDAÇÃO
        ========================================================================= */}
        {abaPrincipal === 'redacao' && <CorretorRedacao />}

        {/* =========================================================================
            ABA 5: TIMER POMODORO (Mantido montado para continuar rodando em segundo plano)
        ========================================================================= */}
        <div
          className="modulo-pomodoro-wrapper"
          style={{ display: abaPrincipal === 'pomodoro' ? 'block' : 'none' }}
        >
          <Pomodoro />
        </div>

        {/* =========================================================================
            ABA 6: SOBRE O PROJETO (EXTENSÃO UNIVERSITÁRIA)
        ========================================================================= */}
        {abaPrincipal === 'sobre' && <SobreProjeto />}

        {/* Modal de Perfil & Carteirinha do Estudante */}
        {modalPerfilAberto && (
          <ModalPerfil
            perfil={perfilAluno}
            estatisticas={{
              percentualGeral,
              totalConcluidos,
              redacoesAvaliadas
            }}
            aoSalvar={salvarPerfil}
            aoFechar={() => setModalPerfilAberto(false)}
          />
        )}

        {/* Rodapé da Aplicação */}
        <footer className="rodape-institucional">
          <div className="rodape-conteudo">
            <div className="rodape-marca">
              <strong>AprovaENEM — UNINASSAU</strong>
              <p>Iniciativa de extensão universitária de acesso público e gratuito para estudantes da rede de ensino.</p>
            </div>
            <div className="rodape-meta">
              <button className="btn-link-sobre-rodape" onClick={() => setAbaPrincipal('sobre')}>
                Conhecer mais sobre o projeto de extensão ↗
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
