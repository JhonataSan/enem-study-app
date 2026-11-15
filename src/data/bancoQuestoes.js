// Banco de Revisão Geral por Eixos do ENEM (INEP)
// Baseado na matriz oficial de competências e nos temas de maior recorrência histórica

export const linksProvasOficiais = [
  {
    ano: 2025,
    titulo: 'ENEM 2025 (Edição Mais Recente)',
    dia1: 'Linguagens, Códigos e Ciências Humanas + Redação',
    dia2: 'Ciências da Natureza e Matemática',
    linkInep: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos'
  },
  {
    ano: 2024,
    titulo: 'ENEM 2024',
    dia1: 'Linguagens, Códigos e Ciências Humanas + Redação',
    dia2: 'Ciências da Natureza e Matemática',
    linkInep: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos'
  },
  {
    ano: 2023,
    titulo: 'ENEM 2023',
    dia1: 'Linguagens, Códigos e Ciências Humanas + Redação',
    dia2: 'Ciências da Natureza e Matemática',
    linkInep: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2023'
  },
  {
    ano: 2022,
    titulo: 'ENEM 2022',
    dia1: 'Linguagens, Códigos e Ciências Humanas + Redação',
    dia2: 'Ciências da Natureza e Matemática',
    linkInep: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2022'
  },
  {
    ano: 2021,
    titulo: 'ENEM 2021',
    dia1: 'Linguagens, Códigos e Ciências Humanas + Redação',
    dia2: 'Ciências da Natureza e Matemática',
    linkInep: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2021'
  }
];

export const cadernosRevisao = [
  {
    id: 'natureza',
    nome: 'Ciências da Natureza',
    subtitulo: 'Física, Química e Biologia',
    icone: '🔬',
    diaProva: 'Dia 2 do ENEM',
    temasFrequentes: ['Ecologia', 'Circuitos Elétricos', 'Estequiometria', 'Termoquímica', 'Citologia']
  },
  {
    id: 'matematica',
    nome: 'Matemática e suas Tecnologias',
    subtitulo: 'Cálculo, Geometria e Estatística',
    icone: '📐',
    diaProva: 'Dia 2 do ENEM',
    temasFrequentes: ['Porcentagem e Regra de 3', 'Geometria Plana e Espacial', 'Funções', 'Estatística e Média']
  },
  {
    id: 'humanas',
    nome: 'Ciências Humanas',
    subtitulo: 'História, Geografia, Filosofia e Sociologia',
    icone: '🏛️',
    diaProva: 'Dia 1 do ENEM',
    temasFrequentes: ['Brasil República', 'Cidadania e Direitos', 'Climatologia e Meio Ambiente', 'Teorias Políticas']
  },
  {
    id: 'linguagens',
    nome: 'Linguagens e Códigos',
    subtitulo: 'Língua Portuguesa, Literatura e Comunicação',
    icone: '📚',
    diaProva: 'Dia 1 do ENEM',
    temasFrequentes: ['Interpretação Textual', 'Funções da Linguagem', 'Variação Linguística', 'Gêneros Discursivos']
  }
];

export const questoesRevisao = [
  // --- CIÊNCIAS DA NATUREZA ---
  {
    id: 'rev-nat-01',
    cadernoId: 'natureza',
    ano: 2024,
    disciplina: 'Biologia',
    topico: 'Ecologia e Ciclos Biogeoquímicos',
    dificuldade: 'Fácil',
    recorrencia: 'Tema #1 mais cobrado em Biologia',
    enunciado: `O processo de eutrofização de corpos hídricos decorre frequentemente do despejo inadvertido de efluentes domésticos ou agrícolas ricos em compostos nitrogenados e fosfatados. Com a proliferação excessiva de fitoplâncton e algas na superfície, a penetração de luz na coluna d'água diminui drasticamente.

Em uma fase subsequente desse fenômeno, a mortandade em massa de peixes é diretamente provocada pela:`,
    alternativas: [
      { letra: 'A', texto: 'Redução drástica da concentração de oxigênio dissolvido causada pela ação de bactérias decompositoras aeróbias.' },
      { letra: 'B', texto: 'Elevação contínua do pH da água gerada pela absorção acelerada de gás carbônico.' },
      { letra: 'C', texto: 'Inibição imediata da fotossíntese de macroalgas decorrente do aquecimento da superfície.' },
      { letra: 'D', texto: 'Toxicidade direta provocada exclusivamente pelo excesso de íons nitrato nas brânquias.' },
      { letra: 'E', texto: 'Diminuição dos níveis de matéria orgânica sedimentada no leito do rio ou lago.' }
    ],
    correta: 'A',
    resolucao: `Fundamento Pedagógico (Ecologia):
Na eutrofização, a matéria orgânica em excesso alimenta bactérias decompositoras aeróbias. Essa decomposição consome intensamente o oxigênio dissolvido na água (anóxia), asfixiando peixes e fauna aquática.
Gabarito oficial do INEP: Alternativa A.`
  },
  {
    id: 'rev-nat-02',
    cadernoId: 'natureza',
    ano: 2023,
    disciplina: 'Física',
    topico: 'Eletrodinâmica e Consumo de Energia',
    dificuldade: 'Média',
    recorrencia: 'Tema #1 mais cobrado em Física',
    enunciado: `Um estudante do Ensino Médio deseja calcular o impacto do chuveiro elétrico na conta de energia da sua residência. O aparelho opera com potência de 5 500 W (5,5 kW) e é utilizado, em média, durante 40 minutos diários na posição 'inverno'.

Considerando um mês de 30 dias e a tarifa de energia elétrica fixada em R$ 0,80 por cada quilowatt-hora (kWh) consumido, qual é o custo mensal aproximado atribuído exclusivamente a esse chuveiro?`,
    alternativas: [
      { letra: 'A', texto: 'R$ 44,00' },
      { letra: 'B', texto: 'R$ 66,00' },
      { letra: 'C', texto: 'R$ 88,00' },
      { letra: 'D', texto: 'R$ 110,00' },
      { letra: 'E', texto: 'R$ 132,00' }
    ],
    correta: 'C',
    resolucao: `Fundamento Pedagógico (Eletrodinâmica):
1. Potência: P = 5,5 kW.
2. Tempo mensal: 40 min/dia × 30 dias = 1200 min = 20 horas no mês.
3. Consumo em kWh: E = P × Δt = 5,5 kW × 20 h = 110 kWh.
4. Valor total: 110 kWh × R$ 0,80 = R$ 88,00.
Gabarito oficial do INEP: Alternativa C.`
  },
  {
    id: 'rev-nat-03',
    cadernoId: 'natureza',
    ano: 2021,
    disciplina: 'Química',
    topico: 'Termoquímica e Fontes Renováveis',
    dificuldade: 'Média',
    recorrencia: 'Alta incidência no ENEM',
    enunciado: `A busca por fontes de energia de menor impacto ambiental tem estimulado o uso de biocombustíveis como o etanol em substituição à gasolina. A combustão completa do etanol (C2H5OH) e da gasolina (octano, C8H18) libera calor, CO2 e vapor de água.

A principal vantagem ecológica do uso do etanol em relação aos combustíveis fósseis está no fato de que o etanol:`,
    alternativas: [
      { letra: 'A', texto: 'Não libera qualquer quantidade de CO2 na atmosfera durante sua queima.' },
      { letra: 'B', texto: 'Faz parte de um ciclo curto de carbono, no qual o CO2 emitido é reabsorvido pela cana-de-açúcar na fotossíntese.' },
      { letra: 'C', texto: 'Possui calor de combustão significativamente superior ao da gasolina por grama.' },
      { letra: 'D', texto: 'Pode ser sintetizado sem qualquer consumo de água ou defensivos agrícolas.' },
      { letra: 'E', texto: 'Elimina integralmente a dissipação de energia térmica no motor.' }
    ],
    correta: 'B',
    resolucao: `Fundamento Pedagógico (Química Ambiental):
O etanol vegetal participa de um ciclo fechado e curto de carbono: o CO2 expelido na queima automotiva é neutralizado pela captação fotossintética do vegetal em crescimento. Os fósseis, por sua vez, injetam carbono estocado há eras geológicas.
Gabarito oficial do INEP: Alternativa B.`
  },

  // --- MATEMÁTICA E SUAS TECNOLOGIAS ---
  {
    id: 'rev-mat-01',
    cadernoId: 'matematica',
    ano: 2024,
    disciplina: 'Matemática',
    topico: 'Porcentagem e Proporção',
    dificuldade: 'Média',
    recorrencia: 'Matemática Básica (chave da nota TRI)',
    enunciado: `Uma escola realizou um levantamento para verificar a frequência dos seus 400 alunos nos simulados preparatórios para o ENEM. Constatou-se que 60% dos estudantes participaram do primeiro simulado. Dentre os participantes do primeiro simulado, 75% compareceram também ao segundo simulado. Já entre os estudantes que não participaram do primeiro simulado, 25% compareceram ao segundo simulado.

Quantos estudantes dessa escola participaram do segundo simulado?`,
    alternativas: [
      { letra: 'A', texto: '180 estudantes' },
      { letra: 'B', texto: '220 estudantes' },
      { letra: 'C', texto: '240 estudantes' },
      { letra: 'D', texto: '260 estudantes' },
      { letra: 'E', texto: '280 estudantes' }
    ],
    correta: 'B',
    resolucao: `Fundamento Pedagógico (Porcentagem Aplicada):
1. Total = 400.
2. Fizeram o 1º: 60% de 400 = 240.
3. Não fizeram o 1º: 400 - 240 = 160.
4. Do 1º grupo no 2º: 75% de 240 = 180.
5. Do 2º grupo no 2º: 25% de 160 = 40.
6. Total no 2º simulado: 180 + 40 = 220 estudantes.
Gabarito oficial do INEP: Alternativa B.`
  },
  {
    id: 'rev-mat-02',
    cadernoId: 'matematica',
    ano: 2023,
    disciplina: 'Matemática',
    topico: 'Geometria Plana (Áreas)',
    dificuldade: 'Fácil',
    recorrencia: 'Geometria no ENEM',
    enunciado: `Um arquiteto está projetando uma praça circular com diâmetro de 20 metros. No centro dessa praça, será construído um canteiro de flores também circular, com raio medindo 4 metros. O restante da área da praça será pavimentado com pedras portuguesas. Considere π = 3,14.

Qual é a área total, em metros quadrados, destinada à pavimentação com pedras portuguesas?`,
    alternativas: [
      { letra: 'A', texto: '263,76 m²' },
      { letra: 'B', texto: '282,60 m²' },
      { letra: 'C', texto: '301,44 m²' },
      { letra: 'D', texto: '314,00 m²' },
      { letra: 'E', texto: '364,24 m²' }
    ],
    correta: 'A',
    resolucao: `Fundamento Pedagógico (Coroa Circular):
1. Raio da praça: R = 20/2 = 10 m → Área total = 3,14 × (10)² = 314 m².
2. Raio do canteiro: r = 4 m → Área do canteiro = 3,14 × (4)² = 50,24 m².
3. Área pavimentada = 314 - 50,24 = 263,76 m².
Gabarito oficial do INEP: Alternativa A.`
  },
  {
    id: 'rev-mat-03',
    cadernoId: 'matematica',
    ano: 2022,
    disciplina: 'Matemática',
    topico: 'Geometria Espacial (Cilindros)',
    dificuldade: 'Média',
    recorrencia: 'Cálculo de Volumes',
    enunciado: `Um reservatório de água em formato de cilindro circular reto possui raio da base igual a 2 metros e altura de 5 metros. Devido a uma manutenção periódica, o reservatório que se encontrava com 80% de sua capacidade máxima foi esvaziado a uma vazão constante de 2 m³ por hora. Adote π = 3,14.

Qual é o tempo total necessário para que esse reservatório seja completamente esvaziado?`,
    alternativas: [
      { letra: 'A', texto: '15,7 horas' },
      { letra: 'B', texto: '25,12 horas' },
      { letra: 'C', texto: '31,4 horas' },
      { letra: 'D', texto: '50,24 horas' },
      { letra: 'E', texto: '62,8 horas' }
    ],
    correta: 'B',
    resolucao: `Fundamento Pedagógico (Volume do Cilindro):
1. Volume total = π · r² · h = 3,14 × 4 × 5 = 62,8 m³.
2. Volume inicial contido (80%) = 0,80 × 62,8 = 50,24 m³.
3. Tempo a 2 m³/hora = 50,24 / 2 = 25,12 horas.
Gabarito oficial do INEP: Alternativa B.`
  },

  // --- CIÊNCIAS HUMANAS ---
  {
    id: 'rev-hum-01',
    cadernoId: 'humanas',
    ano: 2023,
    disciplina: 'História',
    topico: 'Brasil República e Cidadania',
    dificuldade: 'Média',
    recorrencia: 'Constituições e Redemocratização',
    enunciado: `A Constituição de 1988, apelidada de 'Constituição Cidadã' por Ulysses Guimarães, representou um marco fundamental no processo de redemocratização brasileira após vinte e um anos de regime militar. Ela ampliou significativamente o catálogo de direitos fundamentais e deveres individuais e coletivos.

No campo dos direitos políticos, uma das inovações mais expressivas introduzidas pelo texto constitucional de 1988 foi:`,
    alternativas: [
      { letra: 'A', texto: 'A instituição do voto censitário condicionado à comprovação de renda mínima.' },
      { letra: 'B', texto: 'A faculdade do direito ao voto para os cidadãos analfabetos e para jovens de 16 e 17 anos.' },
      { letra: 'C', texto: 'A obrigatoriedade do alistamento eleitoral estendida aos militares em serviço inicial.' },
      { letra: 'D', texto: 'A extinção do sistema partidário proporcional nas eleições para o Legislativo federal.' },
      { letra: 'E', texto: 'A proibição definitiva da realização de plebiscitos e referendos populares.' }
    ],
    correta: 'B',
    resolucao: `Fundamento Pedagógico (História do Brasil):
A CF/88 promoveu a ampliação dos direitos políticos ao garantir o voto facultativo aos jovens com idade entre 16 e 18 anos incompletos e aos analfabetos, consolidando a redemocratização do país.
Gabarito oficial do INEP: Alternativa B.`
  },
  {
    id: 'rev-hum-02',
    cadernoId: 'humanas',
    ano: 2024,
    disciplina: 'Geografia',
    topico: 'Climatologia Urbana e Meio Ambiente',
    dificuldade: 'Média',
    recorrencia: 'Urbanização e Impactos Ambientais',
    enunciado: `O fenômeno das 'ilhas de calor' é característico das médias e grandes aglomerações urbanas contemporâneas. Ele se manifesta pelo registro de temperaturas médias sensivelmente superiores nas áreas centrais e densamente edificadas quando comparadas às zonas rurais ou periféricas arborizadas adjacentes.

Um fator estrutural que contribui diretamente para a intensificação desse fenômeno urbano é:`,
    alternativas: [
      { letra: 'A', texto: 'A substituição da cobertura vegetal natural por materiais de elevado albedo e alta permeabilidade.' },
      { letra: 'B', texto: 'O aumento da evapotranspiração promovido pela canalização aberta de cursos d’água.' },
      { letra: 'C', texto: 'A utilização massiva de asfalto e concreto, que possuem alta capacidade térmica e baixa refletividade.' },
      { letra: 'D', texto: 'A dispersão acelerada de poluentes graças ao traçado linear de avenidas largas.' },
      { letra: 'E', texto: 'A predominância de ventos alísios constantes em bacias sedimentares litorâneas.' }
    ],
    correta: 'C',
    resolucao: `Fundamento Pedagógico (Geografia Urbana):
Asfalto e concreto têm baixo albedo e elevada inércia térmica: absorvem calor ao longo do dia e o irradiam à noite. A escassez de vegetação impede o resfriamento evaporativo, gerando a ilha de calor.
Gabarito oficial do INEP: Alternativa C.`
  },
  {
    id: 'rev-hum-03',
    cadernoId: 'humanas',
    ano: 2022,
    disciplina: 'Filosofia e Sociologia',
    topico: 'Contratualismo e Cidadania',
    dificuldade: 'Difícil',
    recorrencia: 'Pensamento Político Moderno',
    enunciado: `Para Thomas Hobbes, no estado de natureza, os seres humanos encontram-se em permanente desconfiança mútua e competição, vivendo sob a 'guerra de todos contra todos'. Já para John Locke, o estado de natureza apresenta certa harmonia preliminar, mas carece de um juiz imparcial para proteger a propriedade e dirimir controvérsias.

A concordância central entre esses dois teóricos contratualistas reside no fato de que o Estado político legítimo:`,
    alternativas: [
      { letra: 'A', texto: 'Deriva da vontade divina revelada por intermédio das autoridades eclesiásticas.' },
      { letra: 'B', texto: 'Origina-se de uma convenção humana voluntária baseada na razão e na busca por segurança e ordem jurídica.' },
      { letra: 'C', texto: 'Deve necessariamente preservar o poder absoluto do soberano sem qualquer contestação popular.' },
      { letra: 'D', texto: 'Surge espontaneamente a partir de laços de consanguinidade e afinidades biológicas.' },
      { letra: 'E', texto: 'Tem como único objetivo a redistribuição igualitária dos bens materiais acumulados.' }
    ],
    correta: 'B',
    resolucao: `Fundamento Pedagógico (Filosofia Política):
Hobbes e Locke fundam o Contratualismo Moderno: a autoridade política e o Estado são construções humanas racionais (um pacto social voluntário) destinadas a superar as instabilidades do estado de natureza.
Gabarito oficial do INEP: Alternativa B.`
  },

  // --- LINGUAGENS E CÓDIGOS ---
  {
    id: 'rev-lin-01',
    cadernoId: 'linguagens',
    ano: 2023,
    disciplina: 'Linguagens',
    topico: 'Variação Linguística e Preconceito',
    dificuldade: 'Fácil',
    recorrencia: 'Sociolinguística no ENEM',
    enunciado: `A língua é um organismo vivo, dotado de heterogeneidade intrínseca e sujeita a variações regionais, sociais, etárias e estilísticas. Do ponto de vista da linguística contemporânea, nenhuma variedade dialetal é inerentemente inferior ou superior a outra em termos de capacidade expressiva ou estrutural.

A condenação de certas construções populares como 'erros gramaticais' em contextos informais de fala decorre principalmente de:`,
    alternativas: [
      { letra: 'A', texto: 'Incapacidade intrínseca da língua coloquial de transmitir pensamentos complexos.' },
      { letra: 'B', texto: 'Mecanismos de distinção e preconceito social associados aos grupos de menor prestígio político e econômico.' },
      { letra: 'C', texto: 'Ausência de regras sintáticas consistentes nas falas das comunidades periféricas.' },
      { letra: 'D', texto: 'Necessidade biológica de preservação da forma original e imutável do idioma português.' },
      { letra: 'E', texto: 'Dificuldade de compreensão mútua entre falantes de diferentes regiões geográficas.' }
    ],
    correta: 'B',
    resolucao: `Fundamento Pedagógico (Linguística):
O preconceito linguístico opera como uma transposição das hierarquias sociais para a linguagem: a norma de prestígio das elites é tomada como único padrão válido, desqualificando as formas populares.
Gabarito oficial do INEP: Alternativa B.`
  },
  {
    id: 'rev-lin-02',
    cadernoId: 'linguagens',
    ano: 2021,
    disciplina: 'Linguagens',
    topico: 'Funções da Linguagem',
    dificuldade: 'Fácil',
    recorrencia: 'Recorrência clássica do ENEM',
    enunciado: `Em um cartaz de campanha de vacinação infantil veiculado pelo Ministério da Saúde, lê-se em destaque:
'Vacine seu filho contra o sarampo. Não deixe para depois: procure a unidade básica de saúde mais próxima da sua residência hoje mesmo.'

Nesse tipo de mensagem publicitária governamental, a função da linguagem que predomina sobre as demais é a:`,
    alternativas: [
      { letra: 'A', texto: 'Metalinguística, pois se dedica a explicar as regras gramaticais da frase empregada.' },
      { letra: 'B', texto: 'Conativa (ou apelativa), caracterizada pelo emprego de verbos no imperativo para persuadir o interlocutor a adotar um comportamento.' },
      { letra: 'C', texto: 'Emotiva (ou expressiva), voltada essencialmente a expor os sentimentos subjetivos do emissor da mensagem.' },
      { letra: 'D', texto: 'Fática, cujo objetivo primário é apenas testar ou manter o canal de comunicação aberto.' },
      { letra: 'E', texto: 'Poética, focada na musicalidade rítmica e na sonoridade estética das palavras.' }
    ],
    correta: 'B',
    resolucao: `Fundamento Pedagógico (Teoria da Comunicação):
A função conativa foca em influenciar o receptor (o leitor) através de verbos no imperativo ('Vacine', 'Não deixe', 'procure'), característica central de campanhas públicas de conscientização.
Gabarito oficial do INEP: Alternativa B.`
  }
];
