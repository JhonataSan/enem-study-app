export function SobreProjeto() {
  return (
    <div className="sobre-projeto-container">
      {/* Header Institucional */}
      <div className="sobre-hero-box">
        <span className="badge-institucional-sobre">Projeto de Extensão Universitária</span>
        <h2>AprovaENEM — Plataforma Aberta de Preparação para o ENEM</h2>
        <p className="sobre-subtitulo">
          Uma iniciativa acadêmica e comunitária da UNINASSAU voltada à democratização do acesso ao Ensino Superior e ao fortalecimento pedagógico de estudantes do Ensino Médio.
        </p>
      </div>

      <div className="sobre-grid-secoes">
        {/* Missão e Compromisso Social */}
        <div className="card-sobre-detalhe">
          <div className="sobre-icone-topo">🏛️</div>
          <h3>Missão e Compromisso Social</h3>
          <p>
            A Extensão Universitária é o elo direto entre o meio acadêmico e a sociedade. O <strong>AprovaENEM</strong> foi idealizado para democratizar o acesso a ferramentas qualificadas de estudo para vestibulandos, eliminando barreiras financeiras ou cadastros burocráticos.
          </p>
          <p>
            O projeto é <strong>100% gratuito, comunitário e aberto</strong>, garantindo que qualquer estudante possa estruturar sua preparação com independência.
          </p>
        </div>

        {/* Foco Pedagógico no 2º Ano */}
        <div className="card-sobre-detalhe">
          <div className="sobre-icone-topo">🎯</div>
          <h3>Justificativa Pedagógica: O Foco no 2º Ano</h3>
          <p>
            Grande parte dos estudantes posterga a preparação para o último ano do Ensino Médio, resultando em sobrecarga mental, acúmulo de conteúdos e ansiedade pré-prova.
          </p>
          <p>
            A plataforma estimula a construção antecipada da <strong>base conceitual</strong> e a consolidação de hábitos diários no 2º ano, permitindo que o aluno chegue ao 3º ano focado apenas em revisão e simulados.
          </p>
        </div>

        {/* Metodologia e Matriz do INEP */}
        <div className="card-sobre-detalhe">
          <div className="sobre-icone-topo">📊</div>
          <h3>Alinhamento com a Matriz do INEP</h3>
          <p>
            Cada funcionalidade do sistema foi desenhada em estrita conformidade com os critérios oficiais do Ministério da Educação:
          </p>
          <ul className="sobre-lista-pilares">
            <li><strong>Edital Esquematizado:</strong> Baseado nos objetos de conhecimento mais recorrentes da prova.</li>
            <li><strong>Calendário de Hábitos:</strong> Rotina balanceada evitando esgotamento cognitivo.</li>
            <li><strong>Banco Oficial de Questões:</strong> Treino com itens reais das provas de 2021 a 2024.</li>
            <li><strong>Laboratório de Redação:</strong> Avaliação diagnóstica analítica nas 5 Competências do ENEM.</li>
          </ul>
        </div>

        {/* Privacidade e Salvamento Automático */}
        <div className="card-sobre-detalhe">
          <div className="sobre-icone-topo">🔒</div>
          <h3>Privacidade & Zero Burocracia</h3>
          <p>
            Não exigimos e-mail, telefone nem senhas. Os estudos e anotações do aluno ficam salvos <strong>automaticamente no próprio aparelho</strong> via armazenamento local seguro.
          </p>
          <p>
            Isso assegura <strong>privacidade integral por design (LGPD)</strong>, latência zero e uso descomplicado mesmo em conexões lentas de internet.
          </p>
        </div>
      </div>

      {/* Documentação Técnica Opcional (Discreta para Avaliação Acadêmica da Extensão) */}
      <details className="ficha-tecnica-expansivel">
        <summary className="ficha-tecnica-sumario">
          <div className="sumario-conteudo-esq">
            <span className="sumario-icone">⚙️</span>
            <div>
              <strong>Ficha Técnica & Arquitetura (Documentação Acadêmica)</strong>
              <p>Clique para ver especificações técnicas de frontend, IA e LGPD para a banca avaliadora da UNINASSAU.</p>
            </div>
          </div>
          <span className="sumario-seta">▾</span>
        </summary>

        <div className="grid-especificacoes-tecnicas">
          <div className="spec-card">
            <span className="spec-label">Ambiente Frontend:</span>
            <strong>React 19 (SPA) + Vite</strong>
            <p>Construído com componentes funcionais, renderização reativa e arquitetura modular de alta performance.</p>
          </div>

          <div className="spec-card">
            <span className="spec-label">Motor de Diagnóstico de Redação:</span>
            <strong>Google Gemini API (Multimodal)</strong>
            <p>Processamento de texto e visão computacional (OCR) para leitura de fotos de folhas manuscritas, calibrado rigorosamente na matriz das 5 Competências do INEP.</p>
          </div>

          <div className="spec-card">
            <span className="spec-label">Persistência de Dados & LGPD:</span>
            <strong>Web Storage API (localStorage)</strong>
            <p>Armazenamento cliente-side assíncrono. Nenhum dado pessoal ou texto de estudantes é mantido em banco de dados externo.</p>
          </div>

          <div className="spec-card">
            <span className="spec-label">Áudio & Acessibilidade:</span>
            <strong>Web Audio API Nativa</strong>
            <p>Síntese de frequências harmônicas senoidais puras para alertas de foco do Pomodoro, dispensando downloads de arquivos de áudio pesados.</p>
          </div>

          <div className="spec-card">
            <span className="spec-label">Estilização & Design System:</span>
            <strong>CSS3 Moderno com Variáveis Nativas</strong>
            <p>Suporte automático a temas Claro (Light) e Escuro (Dark), tipografia fluida com Plus Jakarta Sans e responsividade mobile-first.</p>
          </div>

          <div className="spec-card">
            <span className="spec-label">Instituição Responsável:</span>
            <strong>UNINASSAU (Centro Universitário)</strong>
            <p>Projeto de Extensão Universitária integrante das Atividades Curriculares de Extensão (ACE).</p>
          </div>
        </div>
      </details>

      {/* Dicas Pedagógicas de Uso */}
      <div className="box-dicas-estudo">
        <h4>Orientações para o Estudante Aproveitar a Plataforma:</h4>
        <div className="dicas-colunas">
          <div className="dica-item">
            <span className="num-dica">1</span>
            <div>
              <strong>Defina suas Metas no Calendário</strong>
              <p>Distribua 2 matérias por dia útil e marque o dia como concluído assim que terminar a sessão de estudo.</p>
            </div>
          </div>
          <div className="dica-item">
            <span className="num-dica">2</span>
            <div>
              <strong>Estude com a Técnica Pomodoro</strong>
              <p>Mantenha blocos de 25 ou 50 minutos de foco absoluto sem alternar abas de redes sociais.</p>
            </div>
          </div>
          <div className="dica-item">
            <span className="num-dica">3</span>
            <div>
              <strong>Resolva Questões Oficiais</strong>
              <p>Acesse o banco de questões para treinar com a linguagem real dos itens aplicados pelo INEP.</p>
            </div>
          </div>
          <div className="dica-item">
            <span className="num-dica">4</span>
            <div>
              <strong>Escreva 1 Redação por Semana</strong>
              <p>Envie o texto digitado ou fotografe sua folha para receber a nota e o plano prático para bater 900+.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
