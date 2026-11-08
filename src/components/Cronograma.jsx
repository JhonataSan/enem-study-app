import { useState, useEffect } from 'react';

const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function Cronograma() {
  const [cronograma, setCronograma] = useState(() => {
    const salvos = localStorage.getItem('enem_cronograma_semanal');
    return salvos ? JSON.parse(salvos) : {
      'Segunda-feira': 'Matemática e Português',
      'Terça-feira': 'História e Biologia',
      'Quarta-feira': 'Química e Geografia',
      'Quinta-feira': 'Física e Filosofia',
      'Sexta-feira': 'Redação e Revisão',
      'Sábado': 'Simulado ou Exercícios'
    };
  });

  const [editando, setEditando] = useState(null);
  const [textoTemp, setTextoTemp] = useState('');

  useEffect(() => {
    localStorage.setItem('enem_cronograma_semanal', JSON.stringify(cronograma));
  }, [cronograma]);

  const iniciarEdicao = (dia) => {
    setEditando(dia);
    setTextoTemp(cronograma[dia] || '');
  };

  const salvarEdicao = (dia) => {
    setCronograma(prev => ({
      ...prev,
      [dia]: textoTemp
    }));
    setEditando(null);
  };

  return (
    <div className="cronograma-container">
      <h2>Planeador de Estudos Semanal</h2>
      <p className="subtitulo">Organize o que estudar em cada dia para manter o ritmo constante[cite: 3, 6].</p>

      <div className="dias-grid">
        {diasDaSemana.map((dia) => (
          <div key={dia} className="card-dia">
            <h3>{dia}</h3>
            {editando === dia ? (
              <div className="edicao-container">
                <textarea 
                  value={textoTemp} 
                  onChange={(e) => setTextoTemp(e.target.value)}
                  rows="3"
                />
                <button className="btn-salvar" onClick={() => salvarEdicao(dia)}>Guardar</button>
              </div>
            ) : (
              <div className="view-container">
                <p>{cronograma[dia] || 'Nenhuma matéria definida'}</p>
                <button className="btn-editar" onClick={() => iniciarEdicao(dia)}>Editar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}