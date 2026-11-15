import { useState, useEffect, useRef } from 'react';

// Chime suave nativo via Web Audio API (sem dependências externas)
function tocarSino(tipo = 'pausa') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    if (tipo === 'pausa') {
      // Tom suave ascendente (relaxante)
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
    } else {
      // Tom focado enérgico
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2); // A5
    }

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch {
    // Silêncio caso o navegador bloqueie
  }
}

export function Pomodoro() {
  const [duracaoEstudo, setDuracaoEstudo] = useState(25);
  const [duracaoPausa, setDuracaoPausa] = useState(5);
  const [modo, setModo] = useState('estudo'); // 'estudo' ou 'pausa'
  const [minutos, setMinutos] = useState(25);
  const [segundos, setSegundos] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [notificacao, setNotificacao] = useState(null);

  const [ciclosConcluidos, setCiclosConcluidos] = useState(() => {
    return parseInt(localStorage.getItem('enem_pomodoro_ciclos') || '0', 10);
  });

  useEffect(() => {
    localStorage.setItem('enem_pomodoro_ciclos', ciclosConcluidos.toString());
  }, [ciclosConcluidos]);

  useEffect(() => {
    let intervalo = null;

    if (ativo) {
      intervalo = setInterval(() => {
        if (segundos > 0) {
          setSegundos(prev => prev - 1);
        } else if (minutos > 0) {
          setMinutos(prev => prev - 1);
          setSegundos(59);
        } else {
          // Fim do bloco
          if (modo === 'estudo') {
            tocarSino('pausa');
            setCiclosConcluidos(c => c + 1);
            setModo('pausa');
            setMinutos(duracaoPausa);
            setSegundos(0);
            setNotificacao({
              tipo: 'pausa',
              titulo: '🎯 Bloco de Foco Concluído!',
              msg: `Excelente dedicação! Descanse por ${duracaoPausa} minutos para oxigenar a mente.`
            });
          } else {
            tocarSino('estudo');
            setModo('estudo');
            setMinutos(duracaoEstudo);
            setSegundos(0);
            setNotificacao({
              tipo: 'estudo',
              titulo: '⚡ Pausa Encerrada!',
              msg: 'Energia recarregada! De volta ao próximo bloco de estudos rumo à aprovação.'
            });
          }
          setAtivo(false);
        }
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [ativo, minutos, segundos, modo, duracaoEstudo, duracaoPausa]);

  // Dispara evento global para o cabeçalho exibir o contador ao vivo em qualquer aba
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('pomodoro_update', {
        detail: {
          ativo,
          minutos,
          segundos,
          modo
        }
      })
    );
  }, [ativo, minutos, segundos, modo]);

  const totalSegundosModo = (modo === 'estudo' ? duracaoEstudo : duracaoPausa) * 60;
  const segundosRestantes = minutos * 60 + segundos;
  const progressoPct = totalSegundosModo > 0 
    ? Math.max(0, Math.min(100, Math.round(((totalSegundosModo - segundosRestantes) / totalSegundosModo) * 100))) 
    : 0;

  const alternarTimer = () => setAtivo(prev => !prev);

  const resetarTimer = () => {
    setAtivo(false);
    setMinutos(modo === 'estudo' ? duracaoEstudo : duracaoPausa);
    setSegundos(0);
  };

  const selecionarModo = (novoModo) => {
    setModo(novoModo);
    setAtivo(false);
    setMinutos(novoModo === 'estudo' ? duracaoEstudo : duracaoPausa);
    setSegundos(0);
  };

  const aplicarPreset = (focoMin, pausaMin) => {
    setDuracaoEstudo(focoMin);
    setDuracaoPausa(pausaMin);
    setAtivo(false);
    if (modo === 'estudo') {
      setMinutos(focoMin);
    } else {
      setMinutos(pausaMin);
    }
    setSegundos(0);
  };

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-header">
        <div>
          <h2>⏱️ Timer de Foco (Pomodoro)</h2>
          <p className="subtitulo">
            A técnica clássica de foco intervalado para retenção máxima de conteúdo sem esgotamento mental.
          </p>
        </div>
        <div className="streak-badge-foco">
          <span className="icone-foco">🔥</span>
          <div>
            <strong>{ciclosConcluidos}</strong>
            <small>blocos concluídos</small>
          </div>
        </div>
      </div>

      {notificacao && (
        <div className={`alerta-toast ${notificacao.tipo}`}>
          <div className="alerta-conteudo">
            <strong>{notificacao.titulo}</strong>
            <span>{notificacao.msg}</span>
          </div>
          <button className="btn-fechar-toast" onClick={() => setNotificacao(null)}>✕</button>
        </div>
      )}

      {/* Seletor de Modo Foco vs Pausa */}
      <div className="botoes-modo-pomodoro">
        <button
          className={`modo-btn ${modo === 'estudo' ? 'ativo' : ''}`}
          onClick={() => selecionarModo('estudo')}
        >
          🎯 Foco Intenso ({duracaoEstudo}m)
        </button>
        <button
          className={`modo-btn ${modo === 'pausa' ? 'ativo' : ''}`}
          onClick={() => selecionarModo('pausa')}
        >
          ☕ Pausa Restauradora ({duracaoPausa}m)
        </button>
      </div>

      {/* Relógio Circular Visual */}
      <div className="timer-wrapper">
        <svg className="timer-svg" viewBox="0 0 240 240">
          <circle
            className="timer-circle-bg"
            cx="120"
            cy="120"
            r="100"
          />
          <circle
            className={`timer-circle-fill ${modo}`}
            cx="120"
            cy="120"
            r="100"
            style={{
              strokeDasharray: 628.3,
              strokeDashoffset: 628.3 - (628.3 * progressoPct) / 100
            }}
          />
        </svg>

        <div className="timer-inner-content">
          <span className="timer-etiqueta-modo">
            {modo === 'estudo' ? 'Tempo de Foco' : 'Momento de Descanso'}
          </span>
          <div className="timer-display">
            {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
          </div>
          <span className="timer-pct-concluido">{progressoPct}% transcorrido</span>
        </div>
      </div>

      {/* Controles Principais */}
      <div className="timer-controles">
        <button
          className={`btn-acao-timer ${ativo ? 'btn-pausar' : 'btn-iniciar'}`}
          onClick={alternarTimer}
        >
          {ativo ? '⏸ Pausar' : '▶ Começar Foco'}
        </button>
        <button className="btn-reset-timer" onClick={resetarTimer} title="Reiniciar bloco">
          ↺ Reiniciar
        </button>
      </div>

      {/* Presets de Estudo */}
      <div className="presets-container">
        <span className="presets-label">Ritmos recomendados:</span>
        <div className="presets-lista">
          <button
            className={`btn-preset ${duracaoEstudo === 25 ? 'ativo' : ''}`}
            onClick={() => aplicarPreset(25, 5)}
          >
            25m / 5m <span>Clássico</span>
          </button>
          <button
            className={`btn-preset ${duracaoEstudo === 50 ? 'ativo' : ''}`}
            onClick={() => aplicarPreset(50, 10)}
          >
            50m / 10m <span>Imersão</span>
          </button>
          <button
            className={`btn-preset ${duracaoEstudo === 15 ? 'ativo' : ''}`}
            onClick={() => aplicarPreset(15, 3)}
          >
            15m / 3m <span>Revisão</span>
          </button>
        </div>
      </div>
    </div>
  );
}
