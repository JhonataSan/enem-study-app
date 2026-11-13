import { useState, useEffect } from 'react';
import { enemTopics } from './data/enemTopics';
import { Cronograma } from './components/Cronograma';
import { Pomodoro } from './components/Pomodoro';
import { CorretorRedacao } from './components/CorretorRedacao';
import './App.css';

function App() {
  const [abaPrincipal, setAbaPrincipal] = useState('conteudos');
  const [areaAtiva, setAreaAtiva] = useState(0);

  const [tema, setTema] = useState(() => {
    return localStorage.getItem('enem_tema') || 'light';
  });

  const [anotacoes, setAnotacoes] = useState(() => {
    return localStorage.getItem('enem_anotacoes') || '';
  });

  const [concluidos, setConcluidos] = useState(() => {
    const salvos = localStorage.getItem('enem_topicos_concluidos');
    return salvos ? JSON.parse(salvos) : {};
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('enem_tema', tema);
  }, [tema]);

  useEffect(() => {
    localStorage.setItem('enem_topicos_concluidos', JSON.stringify(concluidos));
  }, [concluidos]);

  useEffect(() => {
    localStorage.setItem('enem_anotacoes', anotacoes);
  }, [anotacoes]);

  const alternarTema = () => {
    setTema(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const alternarTopico = (topico) => {
    setConcluidos(prev => ({
      ...prev,
      [topico]: !prev[topico]
    }));
  };

  let totalTopicos = 0;
  enemTopics.forEach(area => {
    area.materias.forEach(materia => {
      totalTopicos += materia.topicos.length;
    });
  });

  const totalConcluidos = Object.values(concluidos).filter(Boolean).length;
  const percentualGeral = totalTopicos > 0 ? Math.round((totalConcluidos / totalTopicos) * 100) : 0;

  return (
    <div className="container">
      <div className="header-top">
        <span className="badge-extensao">Projeto de Extensão — UNINASSAU</span>
        <button className="btn-tema" onClick={alternarTema}>
          {tema === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </button>
      </div>

      <header className="header">
        <h1>Plataforma ENEM</h1>
        <p>Organização e Planejamento para o 2º Ano do Ensino Médio</p>
      </header>

      <section className="card-dashboard">
        <div className="info-progresso">
          <span>Progresso Geral do Edital</span>
          <span className="porcentagem-destaque">
            {percentualGeral}%{' '}
            <small style={{ fontSize: '0.8rem', color: 'var(--texto-secundario)' }}>
              ({totalConcluidos}/{totalTopicos})
            </small>
          </span>
        </div>
        <div className="barra-bg">
          <div className="barra-fill" style={{ width: `${percentualGeral}%` }}></div>
        </div>
      </section>

      <div className="menu-principal">
        <button
          className={`menu-btn ${abaPrincipal === 'conteudos' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('conteudos')}
        >
          📚 Conteúdos
        </button>
        <button
          className={`menu-btn ${abaPrincipal === 'cronograma' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('cronograma')}
        >
          📅 Cronograma
        </button>
        <button
          className={`menu-btn ${abaPrincipal === 'pomodoro' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('pomodoro')}
        >
          ⏱️ Timer Foco
        </button>
        <button
          className={`menu-btn ${abaPrincipal === 'anotacoes' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('anotacoes')}
        >
          📝 Anotações
        </button>
        <button
          className={`menu-btn ${abaPrincipal === 'redacao' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('redacao')}
        >
          ✍️ Redação IA
        </button>
      </div>

      {abaPrincipal === 'conteudos' && (
        <>
          <nav className="abas-container">
            {enemTopics.map((item, index) => (
              <button
                key={index}
                className={`aba-btn ${areaAtiva === index ? 'ativa' : ''}`}
                onClick={() => setAreaAtiva(index)}
              >
                {item.area}
              </button>
            ))}
          </nav>

          <main className="conteudo-area">
            {enemTopics[areaAtiva].materias.map((materia, mIndex) => (
              <div key={mIndex} className="card-materia">
                <h3>{materia.nome}</h3>
                <ul className="lista-topicos">
                  {materia.topicos.map((topico, tIndex) => {
                    const estaFeito = !!concluidos[topico];
                    return (
                      <li key={tIndex} className={estaFeito ? 'topico-concluido' : ''}>
                        <label>
                          <input
                            type="checkbox"
                            checked={estaFeito}
                            onChange={() => alternarTopico(topico)}
                          />
                          <span>{topico}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </main>
        </>
      )}

      {abaPrincipal === 'cronograma' && <Cronograma />}
      {abaPrincipal === 'pomodoro' && <Pomodoro />}
      {abaPrincipal === 'anotacoes' && (
        <div className="anotacoes-container">
          <h2>Bloco de Notas Rápido</h2>
          <p className="subtitulo">Espaço pessoal para lembretes, fórmulas ou temas de redação.</p>
          <textarea
            className="textarea-anotacoes"
            placeholder="Digite suas anotações aqui..."
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
          />
        </div>
      )}

      {abaPrincipal === 'redacao' && <CorretorRedacao />}
    </div>
  );
}

export default App;