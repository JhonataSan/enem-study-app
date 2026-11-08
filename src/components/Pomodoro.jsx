import { useState, useEffect } from 'react';

export function Pomodoro() {
  const [minutos, setMinutos] = useState(25);
  const [segundos, setSegundos] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [modo, setModo] = useState('estudo'); // 'estudo' ou 'pausa'

  useEffect(() => {
    let intervalo = null;

    if (ativo) {
      intervalo = setInterval(() => {
        if (segundos > 0) {
          setSegundos(segundos - 1);
        } else if (minutos > 0) {
          setMinutos(minutos - 1);
          setSegundos(59);
        } else {
          // Quando o tempo acaba, alterna entre estudo e pausa
          if (modo === 'estudo') {
            setModo('pausa');
            setMinutos(5);
            alert('Hora de fazer uma pausa de 5 minutos! ☕');
          } else {
            setModo('estudo');
            setMinutos(25);
            alert('Fim da pausa! De volta aos estudos 📚');
          }
          setAtivo(false);
        }
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [ativo, minutos, segundos, modo]);

  const alternarTimer = () => setAtivo(!ativo);

  const resetarTimer = () => {
    setAtivo(false);
    if (modo === 'estudo') {
      setMinutos(25);
    } else {
      setMinutos(5);
    }
    setSegundos(0);
  };

  const alternarModoManual = (novoModo) => {
    setModo(novoModo);
    setAtivo(false);
    setMinutos(novoModo === 'estudo' ? 25 : 5);
    setSegundos(0);
  };

  return (
    <div className="pomodoro-container">
      <h2>⏱️ Timer de Foco (Pomodoro)</h2>
      <p className="subtitulo">Estude em blocos de 25 minutos com pausas de 5 minutos para manter a concentração.</p>

      <div className="botoes-modo">
        <button 
          className={modo === 'estudo' ? 'ativo' : ''} 
          onClick={() => alternarModoManual('estudo')}
        >
          Foco (25 min)
        </button>
        <button 
          className={modo === 'pausa' ? 'ativo' : ''} 
          onClick={() => alternarModoManual('pausa')}
        >
          Pausa (5 min)
        </button>
      </div>

      <div className="timer-display">
        {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
      </div>

      <div className="timer-controles">
        <button className="btn-iniciar" onClick={alternarTimer}>
          {ativo ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="btn-reset" onClick={resetarTimer}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}