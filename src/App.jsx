import { useState, useEffect } from 'react';
import { enemTopics } from './data/enemTopics';
import { Cronograma } from './components/Cronograma';
import { Pomodoro } from './components/Pomodoro';
import './App.css';

function App() {
  const [abaPrincipal, setAbaPrincipal] = useState('conteudos'); // 'conteudos', 'cronograma' ou 'pomodoro'
  const [areaAtiva, setAreaAtiva] = useState(0);

  const [concluidos, setConcluidos] = useState(() => {
    const salvos = localStorage.getItem('enem_topicos_concluidos');
    return salvos ? JSON.parse(salvos) : {};
  });

  useEffect(() => {
    localStorage.setItem('enem_topicos_concluidos', JSON.stringify(concluidos));
  }, [concluidos]);

  const alternarTopico = (topico) => {
    setConcluidos(prev => ({
      ...prev,
      [topico]: !prev[topico]
    }));
  };

  // Cálculo total de progresso do ENEM
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
      <header className="header">
        <h1>Plataforma de Organização - ENEM</h1>
        <p>Projeto de Extensão - 2º Ano do Ensino Médio[cite: 2, 4]</p>
      </header>

      {/* Dashboard de Progresso Geral */}
      <section className="card-dashboard">
        <div className="info-progresso">
          <span>Progresso Geral no ENEM: <strong>{percentualGeral}%</strong></span>
          <span>({totalConcluidos} de {totalTopicos} tópicos)</span>
        </div>
        <div className="barra-bg">
          <div className="barra-fill" style={{ width: `${percentualGeral}%` }}></div>
        </div>
      </section>

      {/* Menu Principal de Navegação */}
      <div className="menu-principal">
        <button 
          className={`menu-btn ${abaPrincipal === 'conteudos' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('conteudos')}
        >
          📚 Conteúdos ENEM
        </button>
        <button 
          className={`menu-btn ${abaPrincipal === 'cronograma' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('cronograma')}
        >
          📅 Meu Cronograma
        </button>
        <button 
          className={`menu-btn ${abaPrincipal === 'pomodoro' ? 'ativo' : ''}`}
          onClick={() => setAbaPrincipal('pomodoro')}
        >
          ⏱️ Timer Foco
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
            <h2>{enemTopics[areaAtiva].area}</h2>
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
    </div>
  );
}

export default App;