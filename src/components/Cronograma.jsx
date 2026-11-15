import { useState, useEffect, useMemo } from 'react';
import { enemTopics } from '../data/enemTopics';

// Trilha Pedagógica Progressiva de 4 Semanas com Alternância Cognitiva
const CICLOS_ESTUDO_PEDAGOGICO = {
  semana1: {
    nome: 'Semana 1: Fundamentos da Base',
    objetivo: 'Consolidar a matemática elementar, a leitura crítica e os conceitos estruturantes.',
    dias: [
      {
        dia: 'Segunda-feira',
        exatas: 'Matemática',
        leitura: 'Linguagens',
        materias: 'Matemática & Linguagens',
        foco: 'Porcentagem, Regra de Três e Estratégias de Leitura Textual',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Terça-feira',
        exatas: 'Biologia',
        leitura: 'História',
        materias: 'Biologia & História do Brasil',
        foco: 'Ecologia (Cadeias e Teias) e Brasil Colônia (Economia Açucareira)',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quarta-feira',
        exatas: 'Química',
        leitura: 'Geografia',
        materias: 'Química Geral & Geografia',
        foco: 'Massa Molar, Balanceamento e Estrutura Fundiária Brasileira',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quinta-feira',
        exatas: 'Física',
        leitura: 'Filosofia',
        materias: 'Física & Filosofia',
        foco: 'Cinemática Escalar (Velocidade Média) e Filosofia Grega Clássica',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Sexta-feira',
        exatas: 'Redação',
        leitura: 'Literatura',
        materias: 'Laboratório de Redação & Literatura',
        foco: 'Projeto de Texto (Tese clara) e Escolas Literárias no Brasil',
        tempo: '2h'
      },
      {
        dia: 'Sábado',
        exatas: 'Exercícios',
        leitura: 'Revisão',
        materias: 'Treino de Questões Oficiais',
        foco: 'Resolução comentada de 20 a 30 questões da Semana 1 no Banco do INEP',
        tempo: '2h'
      }
    ]
  },
  semana2: {
    nome: 'Semana 2: Aprofundamento Teórico',
    objetivo: 'Avançar nas relações de causa-efeito, fórmulas e contextualização histórica.',
    dias: [
      {
        dia: 'Segunda-feira',
        exatas: 'Matemática',
        leitura: 'Linguagens',
        materias: 'Matemática & Gramática',
        foco: 'Geometria Plana (Áreas e Perímetros) e Funções da Linguagem',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Terça-feira',
        exatas: 'Biologia',
        leitura: 'História',
        materias: 'Biologia & História',
        foco: 'Citologia (Membrana Celular) e Brasil Império (Crise Monárquica)',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quarta-feira',
        exatas: 'Química',
        leitura: 'Geografia',
        materias: 'Química & Geografia Urbana',
        foco: 'Cálculo Estequiométrico Básico e Urbanização/Metropolização',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quinta-feira',
        exatas: 'Física',
        leitura: 'Sociologia',
        materias: 'Física & Sociologia',
        foco: 'Leis de Newton (Dinâmica) e Cidadania / Direitos Humanos',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Sexta-feira',
        exatas: 'Redação',
        leitura: 'Repertório',
        materias: 'Redação & Repertórios',
        foco: 'Desenvolvimento argumentativo com citações e dados legitimados',
        tempo: '2h'
      },
      {
        dia: 'Sábado',
        exatas: 'Exercícios',
        leitura: 'Revisão',
        materias: 'Treino Prático de Questões',
        foco: 'Prática de 25 questões cronometradas sobre temas da Semana 2',
        tempo: '2h'
      }
    ]
  },
  semana3: {
    nome: 'Semana 3: Conexões & Aplicação no ENEM',
    objetivo: 'Interpretar gráficos, fórmulas do cotidiano e a matriz de competências da TRI.',
    dias: [
      {
        dia: 'Segunda-feira',
        exatas: 'Matemática',
        leitura: 'Linguagens',
        materias: 'Matemática & Linguagens',
        foco: 'Funções de 1º e 2º Grau (Gráficos) e Variação Linguística',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Terça-feira',
        exatas: 'Biologia',
        leitura: 'História',
        materias: 'Biologia & História Contemporânea',
        foco: 'Genética Básica e República Velha / Era Vargas',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quarta-feira',
        exatas: 'Química',
        leitura: 'Geografia',
        materias: 'Química & Geopolítica',
        foco: 'Soluções (Molaridade) e Globalização / Blocos Econômicos',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quinta-feira',
        exatas: 'Física',
        leitura: 'Filosofia',
        materias: 'Física & Filosofia Moderna',
        foco: 'Circuitos Elétricos (Consumo em kWh) e Contratualismo (Hobbes e Locke)',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Sexta-feira',
        exatas: 'Redação',
        leitura: 'C5',
        materias: 'Redação: Proposta de Intervenção',
        foco: 'Os 5 elementos da Competência 5: Agente, Ação, Meio, Efeito e Detalhamento',
        tempo: '2h'
      },
      {
        dia: 'Sábado',
        exatas: 'Exercícios',
        leitura: 'Revisão',
        materias: 'Treino de Aplicação TRI',
        foco: 'Bateria de 30 questões no Banco de Questões com análise de acertos',
        tempo: '2h'
      }
    ]
  },
  semana4: {
    nome: 'Semana 4: Consolidação & Simulado Mensal',
    objetivo: 'Revisar pontos de dúvida, treinar ritmo de prova e avaliar a evolução.',
    dias: [
      {
        dia: 'Segunda-feira',
        exatas: 'Matemática',
        leitura: 'Revisão',
        materias: 'Matemática: Estatística',
        foco: 'Média, Moda e Mediana + Interpretação de Tabelas',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Terça-feira',
        exatas: 'Biologia',
        leitura: 'História',
        materias: 'Biologia & Ditadura Militar',
        foco: 'Fisiologia Humana e Regime Militar (1964-1985) / Redemocratização',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quarta-feira',
        exatas: 'Química',
        leitura: 'Geografia',
        materias: 'Química & Meio Ambiente',
        foco: 'Termoquímica e Climatologia / Biomas Brasileiros',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Quinta-feira',
        exatas: 'Física',
        leitura: 'Sociologia',
        materias: 'Física & Sociologia do Trabalho',
        foco: 'Termodinâmica / Calorimetria e Mundo do Trabalho Contemporâneo',
        tempo: '1h30 a 2h'
      },
      {
        dia: 'Sexta-feira',
        exatas: 'Redação',
        leitura: 'Simulado',
        materias: 'Redação Completa sob Tempo',
        foco: 'Escrever redação do zero em até 1h15 sobre tema surpresa',
        tempo: '1h30'
      },
      {
        dia: 'Sábado',
        exatas: 'Simulado',
        leitura: 'Oficial',
        materias: 'Simulado Geral Mensal',
        foco: 'Resolução de 45 questões cronometradas no Banco do INEP (Dia 1 ou Dia 2)',
        tempo: '2h30'
      }
    ]
  }
};

const DISCIPLINAS_SUGERIDAS = [
  'Matemática',
  'Biologia',
  'Química',
  'Física',
  'História',
  'Geografia',
  'Filosofia e Sociologia',
  'Português e Literatura',
  'Redação',
  'Treino de Questões'
];

function getIconeMateria(materia = '') {
  const m = materia.toLowerCase();
  if (m.includes('matemática')) return '📐';
  if (m.includes('biologia')) return '🔬';
  if (m.includes('química')) return '🧪';
  if (m.includes('física')) return '⚡';
  if (m.includes('história')) return '🏛️';
  if (m.includes('geografia')) return '🌍';
  if (m.includes('filosofia') || m.includes('sociologia')) return '💭';
  if (m.includes('redação')) return '📝';
  if (m.includes('literatura') || m.includes('linguagens')) return '📚';
  if (m.includes('questões') || m.includes('simulado') || m.includes('exercícios')) return '🎯';
  return '📖';
}

// Localiza a lista de tópicos oficiais do edital para uma matéria
function obterTopicosPorMateria(nomeMateria) {
  const norm = (nomeMateria || '').toLowerCase();
  for (const area of enemTopics) {
    for (const mat of area.materias) {
      const matNome = mat.nome.toLowerCase();
      if (
        matNome.includes(norm) ||
        norm.includes(matNome) ||
        (norm.includes('matemática') && matNome.includes('matemática')) ||
        (norm.includes('biologia') && matNome.includes('biologia')) ||
        (norm.includes('química') && matNome.includes('química')) ||
        (norm.includes('física') && matNome.includes('física')) ||
        (norm.includes('história') && matNome.includes('história')) ||
        (norm.includes('geografia') && matNome.includes('geografia')) ||
        ((norm.includes('filosofia') || norm.includes('sociologia')) && matNome.includes('filosofia')) ||
        ((norm.includes('linguagens') || norm.includes('literatura') || norm.includes('português')) && matNome.includes('linguagens')) ||
        (norm.includes('redação') && matNome.includes('redação'))
      ) {
        return mat.topicos;
      }
    }
  }
  return [];
}

// Extrai o foco pedagógico de uma matéria considerando os tópicos já dominados e a semana do ciclo
function extrairFocoMateria(nomeMateria, semanaKey, concluidosEdital = {}) {
  const norm = (nomeMateria || '').toLowerCase();

  // Tratamento específico para redação
  if (norm.includes('redação')) {
    if (semanaKey === 'semana1') return 'Projeto de Texto e Tese Clara (C2 e C3)';
    if (semanaKey === 'semana2') return 'Repertório Sociocultural Legitimado (C2)';
    if (semanaKey === 'semana3') return 'Coesão Interparágrafos e Conectivos (C4)';
    return 'Proposta de Intervenção com os 5 Elementos (C5)';
  }

  const todos = obterTopicosPorMateria(nomeMateria);
  if (!todos || todos.length === 0) return null;

  // Filtra apenas tópicos que o aluno NÃO concluiu no Edital
  const pendentes = todos.filter(t => !concluidosEdital[t]);

  if (pendentes.length === 0) {
    // Aluno já dominou todos os tópicos dessa matéria no Edital!
    return `Fixação & Questões Desafio (Edital 100% Dominado! 🏆)`;
  }

  // Seleciona o tópico pendente baseado na semana do ciclo pedagógico:
  // semana1: primeiros pendentes (Fundamentos)
  // semana2: intermediários pendentes (Aprofundamento)
  // semana3: avançados/interdisciplinares pendentes (Conexões TRI)
  // semana4: consolidação / tópicos finais
  let index = 0;
  if (semanaKey === 'semana2') {
    index = Math.min(1, pendentes.length - 1);
  } else if (semanaKey === 'semana3') {
    index = Math.min(2, pendentes.length - 1);
  } else if (semanaKey === 'semana4') {
    index = Math.min(3, pendentes.length - 1);
  }

  return pendentes[index];
}

// Combina as 2 matérias do dia gerando foco adaptativo sincronizado
function gerarFocoDiaAdaptativo(m1, m2, semanaKey, concluidosEdital = {}, focoPadrao = '') {
  const n1 = (m1 || '').toLowerCase();
  const n2 = (m2 || '').toLowerCase();

  if (n1.includes('questões') || n1.includes('simulado') || n2.includes('revisão') || n1.includes('treino')) {
    if (semanaKey === 'semana1') return 'Bateria de 20 a 25 questões dos tópicos iniciais no Banco do INEP';
    if (semanaKey === 'semana2') return 'Treino de 25 questões cronometradas de aprofundamento no Banco do INEP';
    if (semanaKey === 'semana3') return 'Bateria de 30 questões interdisciplinares e aplicação da régua TRI no INEP';
    return 'Simulado Oficial Cronometrado (45 questões) para gestão de tempo no ENEM';
  }

  const f1 = extrairFocoMateria(m1, semanaKey, concluidosEdital);
  const f2 = extrairFocoMateria(m2, semanaKey, concluidosEdital);

  if (f1 && f2) {
    return `${f1} e ${f2}`;
  }
  if (f1) return f1;
  if (f2) return f2;
  return focoPadrao;
}

export function Cronograma({ perfilAluno = {}, concluidosEdital = {} }) {
  const [semanaAtivaKey, setSemanaAtivaKey] = useState('semana1');
  const [assistenteAberto, setAssistenteAberto] = useState(false);
  const [guiaAberto, setGuiaAberto] = useState(false);
  const [focoAssistente, setFocoAssistente] = useState('curso');
  const [tempoAssistente, setTempoAssistente] = useState('1h30 a 2h');
  const [feedbackAssistente, setFeedbackAssistente] = useState('');

  const totalDominadosEdital = useMemo(() => {
    return Object.values(concluidosEdital || {}).filter(Boolean).length;
  }, [concluidosEdital]);
  
  // Metas cumpridas salvas: { 'semana1-Segunda-feira': true, ... }
  const [metasCumpridas, setMetasCumpridas] = useState(() => {
    try {
      const salvos = localStorage.getItem('enem_planner_metas');
      return salvos ? JSON.parse(salvos) : {};
    } catch {
      return {};
    }
  });

  // Metas personalizadas pelo aluno: { 'semana1-Segunda-feira': { materias, foco } }
  const [personalizacoes, setPersonalizacoes] = useState(() => {
    try {
      const salvos = localStorage.getItem('enem_planner_custom');
      return salvos ? JSON.parse(salvos) : {};
    } catch {
      return {};
    }
  });

  const [editandoDiaKey, setEditandoDiaKey] = useState(null);
  const [materia1Temp, setMateria1Temp] = useState('');
  const [materia2Temp, setMateria2Temp] = useState('');
  const [focoTemp, setFocoTemp] = useState('');
  const [tempoTemp, setTempoTemp] = useState('');

  useEffect(() => {
    localStorage.setItem('enem_planner_metas', JSON.stringify(metasCumpridas));
  }, [metasCumpridas]);

  useEffect(() => {
    localStorage.setItem('enem_planner_custom', JSON.stringify(personalizacoes));
  }, [personalizacoes]);

  const semanaAtiva = CICLOS_ESTUDO_PEDAGOGICO[semanaAtivaKey];

  const alternarMeta = (chaveDia) => {
    setMetasCumpridas(prev => ({
      ...prev,
      [chaveDia]: !prev[chaveDia]
    }));
  };

  const abrirEdicao = (chaveDia, itemPadrao) => {
    setEditandoDiaKey(chaveDia);
    const custom = personalizacoes[chaveDia];
    
    // Se já havia matérias salvas separadas ou em texto com 'e' / '&'
    let m1 = custom?.materia1;
    let m2 = custom?.materia2;
    if (!m1 || !m2) {
      if (custom?.materias) {
        const partes = custom.materias.split(/\s+(?:e|&|\+)\s+/i);
        m1 = m1 || partes[0]?.trim();
        m2 = m2 || partes[1]?.trim();
      }
    }
    setMateria1Temp(m1 || itemPadrao.exatas);
    setMateria2Temp(m2 || itemPadrao.leitura);
    setFocoTemp(custom?.foco || itemPadrao.foco);
    setTempoTemp(custom?.tempo || itemPadrao.tempo);
  };

  const salvarEdicao = (chaveDia) => {
    const m1 = materia1Temp.trim();
    const m2 = materia2Temp.trim();
    setPersonalizacoes(prev => ({
      ...prev,
      [chaveDia]: {
        materia1: m1,
        materia2: m2,
        materias: m2 ? `${m1} & ${m2}` : m1,
        foco: focoTemp.trim(),
        tempo: tempoTemp.trim()
      }
    }));
    setEditandoDiaKey(null);
  };

  const restaurarPadraoDia = (chaveDia) => {
    setPersonalizacoes(prev => {
      const clone = { ...prev };
      delete clone[chaveDia];
      return clone;
    });
    setEditandoDiaKey(null);
  };

  // Limpa os marcadores da semana ativa
  const limparMetasSemana = () => {
    if (concluidosNaSemana === 0) return;
    if (window.confirm(`Deseja desmarcar todos os dias concluídos da ${semanaAtiva.nome.split(':')[0]}? Suas matérias personalizadas continuarão salvas.`)) {
      setMetasCumpridas(prev => {
        const clone = { ...prev };
        diasDaSemana.forEach(d => {
          delete clone[`${semanaAtivaKey}-${d.dia}`];
        });
        return clone;
      });
    }
  };

  // Limpa os marcadores de todo o ciclo mensal (4 semanas)
  const limparMetasCiclo = () => {
    if (totalConcluidosCiclo === 0) return;
    if (window.confirm('Deseja reiniciar todas as metas do ciclo mensal (as 4 semanas)? Suas matérias personalizadas continuarão salvas.')) {
      setMetasCumpridas({});
    }
  };

  const aplicarRoteiroAssistente = () => {
    const novas = { ...personalizacoes };
    const prefixo = semanaAtivaKey;
    
    let grade = [];
    if (focoAssistente === 'exatas') {
      grade = [
        { dia: 'Segunda-feira', m1: 'Matemática', m2: 'Linguagens', foco: 'Cálculo Básico, Razão/Proporção e Leitura Crítica' },
        { dia: 'Terça-feira', m1: 'Física', m2: 'História', foco: 'Cinemática Escalar e Brasil Colônia' },
        { dia: 'Quarta-feira', m1: 'Matemática', m2: 'Geografia', foco: 'Geometria Plana e Urbanização Brasileira' },
        { dia: 'Quinta-feira', m1: 'Química', m2: 'Filosofia e Sociologia', foco: 'Estequiometria Básica e Filosofia Antiga' },
        { dia: 'Sexta-feira', m1: 'Matemática', m2: 'Redação', foco: 'Funções de 1º e 2º Grau e Projeto de Texto ENEM' },
        { dia: 'Sábado', m1: 'Treino de Questões', m2: 'Revisão', foco: 'Bateria de 25 questões de Exatas e Natureza no Banco do INEP' },
      ];
    } else if (focoAssistente === 'natureza') {
      grade = [
        { dia: 'Segunda-feira', m1: 'Biologia', m2: 'Linguagens', foco: 'Ecologia (Cadeias e Ciclos) e Interpretação Textual' },
        { dia: 'Terça-feira', m1: 'Química', m2: 'História', foco: 'Química Geral, Tabela Periódica e Brasil Império' },
        { dia: 'Quarta-feira', m1: 'Física', m2: 'Geografia', foco: 'Energia Mecânica, Trabalho e Biomas Brasileiros' },
        { dia: 'Quinta-feira', m1: 'Biologia', m2: 'Filosofia e Sociologia', foco: 'Citologia, Membrana Plasmática e Contratualistas' },
        { dia: 'Sexta-feira', m1: 'Química', m2: 'Redação', foco: 'Soluções, Concentração e Proposta de Intervenção' },
        { dia: 'Sábado', m1: 'Treino de Questões', m2: 'Revisão', foco: 'Bateria de questões oficiais de Ciências da Natureza' },
      ];
    } else if (focoAssistente === 'humanas') {
      grade = [
        { dia: 'Segunda-feira', m1: 'História', m2: 'Matemática', foco: 'Era Vargas, República Velha e Porcentagem/Juros' },
        { dia: 'Terça-feira', m1: 'Redação', m2: 'Biologia', foco: 'Estrutura da Dissertação-Argumentativa e Fisiologia Humana' },
        { dia: 'Quarta-feira', m1: 'Geografia', m2: 'Física', foco: 'Geopolítica Mundial, Globalização e Leis de Newton' },
        { dia: 'Quinta-feira', m1: 'Filosofia e Sociologia', m2: 'Química', foco: 'Cidadania, Direitos Humanos e Química Orgânica' },
        { dia: 'Sexta-feira', m1: 'Redação', m2: 'Linguagens', foco: 'Produção completa de 1 texto cronometrado e Figuras de Linguagem' },
        { dia: 'Sábado', m1: 'Treino de Questões', m2: 'Revisão', foco: 'Resolução de questões de Humanas e Linguagens do INEP' },
      ];
    } else {
      // Equilíbrio Geral ou Foco no Curso
      grade = [
        { dia: 'Segunda-feira', m1: 'Matemática', m2: 'Linguagens', foco: 'Matemática Básica e Estratégias de Interpretação Textual' },
        { dia: 'Terça-feira', m1: 'Biologia', m2: 'História', foco: 'Ecologia e Transformações Sociais no Brasil' },
        { dia: 'Quarta-feira', m1: 'Química', m2: 'Geografia', foco: 'Química do Cotidiano e Geografia Física/Agrária' },
        { dia: 'Quinta-feira', m1: 'Física', m2: 'Filosofia e Sociologia', foco: 'Mecânica, Ondulatória e Pensamento Crítico' },
        { dia: 'Sexta-feira', m1: 'Redação', m2: 'Literatura', foco: 'Projeto de Texto ENEM e Repertórios Socioculturais' },
        { dia: 'Sábado', m1: 'Treino de Questões', m2: 'Revisão', foco: 'Bateria mista de questões reais no Banco do INEP' },
      ];
    }

    grade.forEach(g => {
      const focoDinamico = gerarFocoDiaAdaptativo(g.m1, g.m2, prefixo, concluidosEdital, g.foco);
      novas[`${prefixo}-${g.dia}`] = {
        materia1: g.m1,
        materia2: g.m2,
        materias: `${g.m1} & ${g.m2}`,
        foco: focoDinamico,
        tempo: tempoAssistente
      };
    });

    setPersonalizacoes(novas);
    setAssistenteAberto(false);
    setFeedbackAssistente(`✨ Roteiro da ${semanaAtiva.nome.split(':')[0]} gerado com sucesso! Tópicos foram sincronizados com seu Edital e adaptados ao nível da semana.`);
  };

  // Progresso da semana ativa
  const diasDaSemana = semanaAtiva.dias;
  const concluidosNaSemana = diasDaSemana.filter(d => metasCumpridas[`${semanaAtivaKey}-${d.dia}`]).length;
  const pctSemana = Math.round((concluidosNaSemana / diasDaSemana.length) * 100);

  // Progresso total do ciclo de 4 semanas
  const totalDiasCiclo = 24; // 6 dias x 4 semanas
  const totalConcluidosCiclo = Object.values(metasCumpridas).filter(Boolean).length;
  const pctCicloTotal = Math.min(100, Math.round((totalConcluidosCiclo / totalDiasCiclo) * 100));

  return (
    <div className="planner-estudos-container">
      {/* Cabeçalho Amigável & Acolhedor */}
      <div className="planner-header-topo">
        <div className="planner-header-texto">
          <h2>Meu Planner Semanal de Estudos</h2>
          <p className="subtitulo">
            Estude com consistência e sem sobrecarga. Alternar 1 matéria de Exatas com 1 de Humanas por dia evita a fadiga mental e multiplica sua retenção.
          </p>
        </div>

        {/* Card do Progresso do Ciclo */}
        <div className="card-ciclo-resumo-topo">
          <div className="ciclo-topo-rotulo">
            <span className="ciclo-icone-trofeu">🏆</span>
            <span className="ciclo-label">Ciclo Mensal (4 Semanas)</span>
            {totalConcluidosCiclo > 0 && (
              <button
                type="button"
                className="btn-limpar-ciclo-topo"
                onClick={limparMetasCiclo}
                title="Reiniciar os marcadores de todo o ciclo mensal (4 semanas)"
              >
                ↺ Limpar mês todo
              </button>
            )}
          </div>
          <div className="ciclo-metricas-box">
            <strong>{totalConcluidosCiclo} de {totalDiasCiclo} dias cumpridos</strong>
            <span className="ciclo-pct">{pctCicloTotal}%</span>
          </div>
          <div className="barra-bg-mini">
            <div className="barra-fill-mini" style={{ width: `${pctCicloTotal}%` }}></div>
          </div>
        </div>
      </div>

      {/* Barra de Ações Pedagógicas & Ensino da Rotina */}
      <div className="acoes-pedagogicas-planner">
        <button
          type="button"
          className="btn-assistente-roteiro-acao"
          onClick={() => {
            setAssistenteAberto(prev => !prev);
            setGuiaAberto(false);
          }}
        >
          <span>✨ Assistente: Montar Meu Roteiro Semanal</span>
          <span className="badge-novo-chip">Inteligente</span>
        </button>

        <button
          type="button"
          className={`btn-guia-neurociencia-acao ${guiaAberto ? 'ativo' : ''}`}
          onClick={() => {
            setGuiaAberto(prev => !prev);
            setAssistenteAberto(false);
          }}
        >
          <span>💡 Como Pensar Meu Roteiro (Os 3 Segredos da Neurociência)</span>
          <span>{guiaAberto ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Feedback de sucesso quando aplica roteiro */}
      {feedbackAssistente && (
        <div className="banner-feedback-assistente">
          <span>{feedbackAssistente}</span>
          <button
            type="button"
            className="btn-fechar-feedback"
            onClick={() => setFeedbackAssistente('')}
          >
            ✕
          </button>
        </div>
      )}

      {/* Painel do Assistente de Roteiro */}
      {assistenteAberto && (
        <div className="painel-assistente-estudo">
          <div className="assistente-topo">
            <div className="assistente-titulo-bloco">
              <span className="assistente-icone-varinha">🧙‍♂️</span>
              <div>
                <h4>Assistente de Roteiro: Semana Equilibrada</h4>
                <p>
                  Olá, <strong>{perfilAluno?.nome || 'Estudante'}</strong>! Em vez de tentar advinhar, deixe o método pedagógico distribuir suas matérias de forma inteligente para seu cérebro render o dobro.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-fechar-assistente"
              onClick={() => setAssistenteAberto(false)}
            >
              ✕
            </button>
          </div>

          {/* Banner de Sincronização Inteligente com Edital e Semana Ativa */}
          <div className="assistente-sync-banner">
            <div className="assistente-sync-tag">
              <span className="dot-sync-pulsando"></span>
              <strong>Sincronização Ativa com o seu Edital</strong>
            </div>
            <p>
              O roteiro será montado sob medida para a <strong>{semanaAtiva.nome}</strong>.
              {totalDominadosEdital > 0 ? (
                <> Já identificamos <strong>{totalDominadosEdital} tópico(s) dominado(s)</strong> no seu Edital — eles serão automaticamente substituídos pelos próximos assuntos pendentes da sua lista!</>
              ) : (
                <> Priorizando os <strong>tópicos fundamentais da base</strong> do Edital para você iniciar com máxima segurança.</>
              )}
            </p>
          </div>

          <div className="assistente-etapas-grid">
            {/* Passo 1: Foco */}
            <div className="assistente-etapa-card">
              <span className="etapa-numero-tag">Passo 1</span>
              <h5>Qual é o foco que você precisa agora?</h5>
              <div className="opcoes-foco-assistente">
                <label className={`opcao-foco-label ${focoAssistente === 'curso' ? 'selecionada' : ''}`}>
                  <input
                    type="radio"
                    name="foco-assistente"
                    value="curso"
                    checked={focoAssistente === 'curso'}
                    onChange={() => setFocoAssistente('curso')}
                  />
                  <div>
                    <strong>🎯 Foco no meu curso alvo ({perfilAluno?.cursoAlvo ? perfilAluno.cursoAlvo.split(' ')[0] : 'Geral'})</strong>
                    <span>Dá maior peso às disciplinas mais valorizadas pelo SISU na sua carreira.</span>
                  </div>
                </label>

                <label className={`opcao-foco-label ${focoAssistente === 'equilibrio' ? 'selecionada' : ''}`}>
                  <input
                    type="radio"
                    name="foco-assistente"
                    value="equilibrio"
                    checked={focoAssistente === 'equilibrio'}
                    onChange={() => setFocoAssistente('equilibrio')}
                  />
                  <div>
                    <strong>⚖️ Equilíbrio Total (Recomendado para o 2º Ano)</strong>
                    <span>Base ampla cobrindo as 4 áreas do ENEM sem deixar nenhuma de lado.</span>
                  </div>
                </label>

                <label className={`opcao-foco-label ${focoAssistente === 'exatas' ? 'selecionada' : ''}`}>
                  <input
                    type="radio"
                    name="foco-assistente"
                    value="exatas"
                    checked={focoAssistente === 'exatas'}
                    onChange={() => setFocoAssistente('exatas')}
                  />
                  <div>
                    <strong>📐 Reforço em Exatas (Matemática e Física)</strong>
                    <span>Mais sessões de cálculo pareadas estrategicamente com matérias de leitura.</span>
                  </div>
                </label>

                <label className={`opcao-foco-label ${focoAssistente === 'natureza' ? 'selecionada' : ''}`}>
                  <input
                    type="radio"
                    name="foco-assistente"
                    value="natureza"
                    checked={focoAssistente === 'natureza'}
                    onChange={() => setFocoAssistente('natureza')}
                  />
                  <div>
                    <strong>🔬 Reforço em Ciências da Natureza (Biologia e Química)</strong>
                    <span>Ciclos, estequiometria e ecologia pareados com história e filosofia.</span>
                  </div>
                </label>

                <label className={`opcao-foco-label ${focoAssistente === 'humanas' ? 'selecionada' : ''}`}>
                  <input
                    type="radio"
                    name="foco-assistente"
                    value="humanas"
                    checked={focoAssistente === 'humanas'}
                    onChange={() => setFocoAssistente('humanas')}
                  />
                  <div>
                    <strong>📝 Turbinar Redação e Humanas</strong>
                    <span>Mais produção textual e repertório sociocultural para buscar 900+ no ENEM.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Passo 2: Carga Horária */}
            <div className="assistente-etapa-card">
              <span className="etapa-numero-tag">Passo 2</span>
              <h5>Qual é o seu tempo disponível por dia?</h5>
              <div className="opcoes-tempo-assistente">
                <label className={`opcao-tempo-card ${tempoAssistente === '1h a 1h30' ? 'selecionado' : ''}`}>
                  <input
                    type="radio"
                    name="tempo-assistente"
                    value="1h a 1h30"
                    checked={tempoAssistente === '1h a 1h30'}
                    onChange={() => setTempoAssistente('1h a 1h30')}
                  />
                  <div>
                    <strong>🌿 Moderado (~1h a 1h30)</strong>
                    <span>35 a 45 min por matéria. Ideal para quem já tem rotina escolar pesada.</span>
                  </div>
                </label>

                <label className={`opcao-tempo-card ${tempoAssistente === '1h30 a 2h' ? 'selecionado' : ''}`}>
                  <input
                    type="radio"
                    name="tempo-assistente"
                    value="1h30 a 2h"
                    checked={tempoAssistente === '1h30 a 2h'}
                    onChange={() => setTempoAssistente('1h30 a 2h')}
                  />
                  <div>
                    <strong>⚡ Padrão Ouro (~1h30 a 2h)</strong>
                    <span>50 min a 1h por matéria. Equilíbrio perfeito entre fixação e foco.</span>
                  </div>
                </label>

                <label className={`opcao-tempo-card ${tempoAssistente === '2h a 3h' ? 'selecionado' : ''}`}>
                  <input
                    type="radio"
                    name="tempo-assistente"
                    value="2h a 3h"
                    checked={tempoAssistente === '2h a 3h'}
                    onChange={() => setTempoAssistente('2h a 3h')}
                  />
                  <div>
                    <strong>🔥 Intensivo (~2h a 3h)</strong>
                    <span>1h a 1h15 por matéria. Para quem quer aprofundar tópicos avançados.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="assistente-acoes-rodape">
            <button
              type="button"
              className="btn-aplicar-assistente"
              onClick={aplicarRoteiroAssistente}
            >
              ✓ Aplicar à {semanaAtiva.nome.split(':')[0]}
            </button>
            <button
              type="button"
              className="btn-cancelar-assistente"
              onClick={() => setAssistenteAberto(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Painel do Guia de Neurociência & Roteiro */}
      {guiaAberto && (
        <div className="painel-guia-neurociencia">
          <div className="guia-topo-header">
            <h4>🧠 Como Pensar o Seu Roteiro (Os 3 Princípios da Ciência da Aprendizagem)</h4>
            <p>O segredo dos aprovados não é estudar 10 horas até desmaiar de cansaço. É estudar com a engrenagem certa:</p>
          </div>

          <div className="guia-cards-grid">
            <div className="guia-principio-card">
              <span className="guia-icone-pilar">⚡</span>
              <h5>1. A Regra do Cérebro Cruzado (1 Exata + 1 Leitura)</h5>
              <p>
                Cálculo (lobo parietal) e Leitura/Interpretação (lobo temporal) ativam áreas neurais diferentes. Se você estuda Matemática seguida de Física, satura o mesmo circuito e seu cérebro "trava". Ao alternar Matemática com História, seu cérebro descansa a área de cálculo enquanto assimila a narrativa com facilidade.
              </p>
            </div>

            <div className="guia-principio-card">
              <span className="guia-icone-pilar">⏳</span>
              <h5>2. Constância Bate Exaustão (1h30 a 2h no 2º Ano)</h5>
              <p>
                1h30 diária de segunda a sexta resulta em mais de 300 horas líquidas no ano! No 2º ano, seu grande objetivo é construir o músculo do hábito e a disciplina sem estresse. Nunca troque 5 dias regulares por uma maratona de 8 horas no sábado: o cérebro aprende por repetição espaçada, não por sobrecarga.
              </p>
            </div>

            <div className="guia-principio-card">
              <span className="guia-icone-pilar">🎯</span>
              <h5>3. Sábado de Questões & Domingo Sagrado</h5>
              <p>
                A semana é para aprender os conceitos; o sábado é para validar no Banco de Questões do INEP. E o domingo é inegociável: é durante o descanso que o cérebro faz a "poda sináptica" e transfere os aprendizados da memória de trabalho para a memória de longo prazo. Descanse com orgulho!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dica Amigável de Rotina */}
      <div className="dica-planner-amigavel">
        <span className="dica-icone">💡</span>
        <div className="dica-texto">
          <strong>Como funciona a sua rotina:</strong> De segunda a sexta você estuda 2 matérias complementares (~1h30 a 2h no total). No sábado, treina questões reais no Banco do INEP. E no domingo, descanso ativo merecido para fixar o aprendizado!
        </div>
      </div>

      {/* Seletor das 4 Semanas da Jornada */}
      <div className="seletor-semanas-grid">
        {Object.entries(CICLOS_ESTUDO_PEDAGOGICO).map(([chave, sem], idx) => {
          const ehAtiva = semanaAtivaKey === chave;
          const concluidasNesta = sem.dias.filter(d => metasCumpridas[`${chave}-${d.dia}`]).length;
          const pct = Math.round((concluidasNesta / 6) * 100);
          const iconesSemana = ['🌱', '🚀', '🧩', '🎯'];

          return (
            <button
              key={chave}
              type="button"
              className={`card-semana-stepper ${ehAtiva ? 'ativo' : ''}`}
              onClick={() => setSemanaAtivaKey(chave)}
            >
              <div className="semana-stepper-topo">
                <span className="semana-icone-fase">{iconesSemana[idx]}</span>
                <span className={`semana-badge-status ${concluidasNesta === 6 ? 'completa' : ''}`}>
                  {concluidasNesta === 6 ? '✓ 6/6 Feito' : `${concluidasNesta}/6 dias`}
                </span>
              </div>
              <strong className="semana-titulo-amigavel">Semana {idx + 1}</strong>
              <span className="semana-subtitulo-amigavel">{sem.nome.split(':')[1]?.trim() || sem.nome}</span>
              <div className="barra-bg-mini" style={{ marginTop: '8px' }}>
                <div className="barra-fill-mini" style={{ width: `${pct}%` }}></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalhe da Semana Selecionada */}
      <div className="painel-semana-ativa">
        <div className="semana-ativa-header">
          <div>
            <h3>{semanaAtiva.nome}</h3>
            <p className="semana-objetivo-txt">🎯 <strong>Foco da semana:</strong> {semanaAtiva.objetivo}</p>
          </div>
          <div className="semana-aproveitamento-box">
            <div className="semana-aproveitamento-tag">
              <span>Progresso da semana: <strong>{concluidosNaSemana} de 6 dias ({pctSemana}%)</strong></span>
            </div>
            {concluidosNaSemana > 0 && (
              <button
                type="button"
                className="btn-limpar-semana-link"
                onClick={limparMetasSemana}
                title="Desmarcar todos os dias concluídos desta semana"
              >
                ↺ Limpar semana
              </button>
            )}
          </div>
        </div>

        {/* Banner comemorativo quando completa os 6 dias */}
        {concluidosNaSemana === 6 && (
          <div className="banner-semana-concluida">
            <span className="emoji-festa">🎉</span>
            <div>
              <strong>Semana concluída com excelência!</strong>
              <p>Você cumpriu todas as sessões planejadas para esta semana. Aproveite seu domingo para descansar com dever cumprido!</p>
            </div>
          </div>
        )}

        {/* Lista Espaçosa e Amigável dos Dias (Segunda a Sábado) */}
        <div className="dias-planner-lista">
          <datalist id="lista-disciplinas-sugeridas">
            {DISCIPLINAS_SUGERIDAS.map(d => (
              <option key={d} value={d} />
            ))}
          </datalist>

          {diasDaSemana.map((item) => {
            const chaveDia = `${semanaAtivaKey}-${item.dia}`;
            const custom = personalizacoes[chaveDia];
            const estaConcluido = !!metasCumpridas[chaveDia];
            const estaEditando = editandoDiaKey === chaveDia;

            // Extrai as duas matérias (customizadas ou padrão)
            let m1Exibida = custom?.materia1;
            let m2Exibida = custom?.materia2;
            if (!m1Exibida || !m2Exibida) {
              if (custom?.materias) {
                const partes = custom.materias.split(/\s+(?:e|&|\+)\s+/i);
                m1Exibida = m1Exibida || partes[0]?.trim();
                m2Exibida = m2Exibida || partes[1]?.trim();
              }
            }
            m1Exibida = m1Exibida || item.exatas;
            m2Exibida = m2Exibida || item.leitura;

            const materiasExibidas = custom?.materias || (m2Exibida ? `${m1Exibida} & ${m2Exibida}` : m1Exibida);
            const focoExibido = custom?.foco || item.foco;
            const tempoExibido = custom?.tempo || item.tempo;

            return (
              <div key={item.dia} className={`card-dia-planner-amigavel ${estaConcluido ? 'concluido' : ''} ${estaEditando ? 'em-edicao' : ''}`}>
                <div className="dia-card-cabecalho">
                  <div className="dia-titulo-bloco">
                    <span className="dia-semana-pill">{item.dia}</span>
                    <span className="dia-pares-pill">
                      {getIconeMateria(m1Exibida)} {m1Exibida} {m2Exibida ? `+ ${getIconeMateria(m2Exibida)} ${m2Exibida}` : ''}
                    </span>
                  </div>

                  <div className="dia-meta-direita">
                    <span className="dia-tempo-estimado">⏱️ {tempoExibido}</span>
                    {!estaEditando && (
                      <button
                        className="btn-editar-dia-clean"
                        onClick={() => abrirEdicao(chaveDia, item)}
                        title="Personalizar as matérias deste dia"
                      >
                        ✎ Ajustar
                      </button>
                    )}
                  </div>
                </div>

                {estaEditando ? (
                  <div className="card-edicao-estudio">
                    <div className="edicao-estudio-topo">
                      <div className="edicao-topo-titulo">
                        <span className="icone-lapis-edicao">✏️</span>
                        <div>
                          <h5>Ajustar Rotina de {item.dia}</h5>
                          <p>Escolha as duas disciplinas da sessão ou clique nos atalhos rápidos abaixo:</p>
                        </div>
                      </div>
                      {custom && (
                        <button
                          type="button"
                          className="btn-restaurar-link"
                          onClick={() => restaurarPadraoDia(chaveDia)}
                          title="Restaurar a grade sugerida original para este dia"
                        >
                          ↺ Restaurar padrão
                        </button>
                      )}
                    </div>

                    <div className="edicao-campos-grid">
                      {/* Disciplina 1 */}
                      <div className="campo-edicao-grupo">
                        <label>1ª Disciplina (Exatas / Natureza):</label>
                        <div className="input-com-icone-wrapper">
                          <span className="icone-input-materia">{getIconeMateria(materia1Temp)}</span>
                          <input
                            type="text"
                            list="lista-disciplinas-sugeridas"
                            className="input-edicao-moderno"
                            placeholder="Ex: Biologia"
                            value={materia1Temp}
                            onChange={(e) => setMateria1Temp(e.target.value)}
                          />
                        </div>
                        <div className="chips-rapidos-disciplina">
                          {['Matemática', 'Biologia', 'Química', 'Física'].map(d => (
                            <button
                              key={d}
                              type="button"
                              className={`chip-selecao-rapida ${materia1Temp.toLowerCase().includes(d.toLowerCase()) ? 'selecionado' : ''}`}
                              onClick={() => setMateria1Temp(d)}
                            >
                              {getIconeMateria(d)} {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Disciplina 2 */}
                      <div className="campo-edicao-grupo">
                        <label>2ª Disciplina (Humanas / Linguagens):</label>
                        <div className="input-com-icone-wrapper">
                          <span className="icone-input-materia">{getIconeMateria(materia2Temp)}</span>
                          <input
                            type="text"
                            list="lista-disciplinas-sugeridas"
                            className="input-edicao-moderno"
                            placeholder="Ex: Português"
                            value={materia2Temp}
                            onChange={(e) => setMateria2Temp(e.target.value)}
                          />
                        </div>
                        <div className="chips-rapidos-disciplina">
                          {['História', 'Geografia', 'Filosofia', 'Português', 'Redação'].map(d => (
                            <button
                              key={d}
                              type="button"
                              className={`chip-selecao-rapida ${materia2Temp.toLowerCase().includes(d.toLowerCase()) ? 'selecionado' : ''}`}
                              onClick={() => setMateria2Temp(d)}
                            >
                              {getIconeMateria(d)} {d}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tópico de Foco */}
                    <div className="campo-edicao-grupo" style={{ marginTop: '14px' }}>
                      <label>Tópicos ou Capítulo de Foco:</label>
                      <input
                        type="text"
                        className="input-edicao-moderno"
                        placeholder="Ex: Citologia e Funções Sintáticas"
                        value={focoTemp}
                        onChange={(e) => setFocoTemp(e.target.value)}
                      />
                    </div>

                    {/* Tempo estimado */}
                    <div className="campo-edicao-tempo" style={{ marginTop: '14px' }}>
                      <label>Tempo sugerido da sessão:</label>
                      <div className="botoes-tempo-opcoes">
                        {['1h', '1h30 a 2h', '2h', '2h30', '3h'].map(t => (
                          <button
                            key={t}
                            type="button"
                            className={`btn-opcao-tempo ${tempoTemp === t ? 'ativo' : ''}`}
                            onClick={() => setTempoTemp(t)}
                          >
                            ⏱️ {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="edicao-acoes-rodape">
                      <button
                        type="button"
                        className="btn-salvar-edicao-estudio"
                        onClick={() => salvarEdicao(chaveDia)}
                      >
                        ✓ Salvar Alterações
                      </button>
                      <button
                        type="button"
                        className="btn-cancelar-edicao-estudio"
                        onClick={() => setEditandoDiaKey(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="dia-card-corpo">
                    <div className="dia-conteudo-central">
                      <h4 className="dia-materias-nome">{materiasExibidas}</h4>
                      <p className="dia-foco-desc">
                        <span className="rotulo-foco">Foco de estudo:</span> {focoExibido}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`btn-acao-concluir-dia ${estaConcluido ? 'concluido' : ''}`}
                      onClick={() => alternarMeta(chaveDia)}
                    >
                      <span className="circulo-check">{estaConcluido ? '✓' : '◯'}</span>
                      <span>{estaConcluido ? 'Sessão Concluída!' : 'Marcar como estudado'}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Card do Domingo Amigável (Descanso Ativo) */}
        <div className="card-domingo-amigavel">
          <div className="domingo-emoji">☕</div>
          <div className="domingo-info">
            <strong>Domingo: Descanso Ativo & Oxigenação Mental</strong>
            <p>Descansar faz parte do aprendizado! Durante o sono e o relaxamento, seu cérebro consolida as conexões neurais e fixa o conteúdo da semana. Aproveite para praticar esportes, ler ou relaxar sem culpa.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
