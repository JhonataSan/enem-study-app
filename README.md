# AprovaENEM 🎓 — Projeto de Extensão Universitária (UNINASSAU)

> **Plataforma inteligente de planejamento, foco e correção de redação com Inteligência Artificial para estudantes do Ensino Médio.**

O **AprovaENEM** é uma iniciativa acadêmica e educacional gratuita desenvolvida como Projeto de Extensão Universitária da **UNINASSAU**, pensada estrategicamente para estudantes do **2º ano do Ensino Médio** que desejam construir uma base sólida e antecipar sua preparação para o Exame Nacional do Ensino Médio.

---

## 🌟 Proposta de Valor & Pilares

1. **Edital Esquematizado & Gamificado**:
   * Checklist completo de tópicos do edital organizado pelas 4 grandes áreas do conhecimento (Matemática, Ciências da Natureza, Ciências Humanas e Linguagens).
   * Barras de progresso individualizadas e busca em tempo real por assuntos.

2. **Corretor de Redação com Inteligência Artificial (Padrão INEP)**:
   * Envio de dissertação via texto digitado ou foto da folha manuscrita.
   * **Boletim Oficial de Desempenho**: avaliação detalhada das 5 Competências do ENEM (0 a 200 pontos cada, totalizando até 1000 pontos).
   * Destaques práticos de Pontos Fortes e Plano de Ação Estratégico para alcançar notas 900+.
   * Histórico salvo localmente para acompanhar a evolução semanal.

3. **Timer de Foco (Técnica Pomodoro)**:
   * Cronômetro circular visual com indicador de progresso SVG.
   * Sons suaves via Web Audio API (sem travamentos de tela).
   * Presets ajustáveis (25m/5m, 50m/10m, 15m/3m) e contador de blocos concluídos.

4. **Planejador Semanal de Estudos**:
   * Grade semanal balanceada para conciliar a rotina escolar do 2º ano com a prática de exercícios e simulados.
   * Controle de metas cumpridas por dia.

5. **Bloco de Anotações & Repositório de Fórmulas**:
   * Inserção com 1 clique de fórmulas essenciais de Matemática, Física e Química.
   * Repertórios socioculturais coringas (CF/88, Bauman, Dimenstein, Habermas) para uso em redações.

---

## 🛠️ Tecnologias Utilizadas

* **React 19** com componentes funcionais e Hooks modernos.
* **Vite** para compilação ultrarrápida com Hot Module Replacement (HMR).
* **Gemini API** para processamento multimodal e análise pedagógica de redações.
* **Web Audio API** para notificações sonoras leves e nativas.
* **LocalStorage API** para persistência de dados local sem necessidade de banco externo.
* **Design System Customizado** com suporte nativo a Tema Claro (Light) e Tema Escuro (Dark).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js v18+ instalado no computador.

### Passo a Passo

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env` ou configure no seu ambiente de hospedagem:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

3. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse a URL informada no terminal (normalmente `http://localhost:5173`).

4. **Gerar build de produção**:
   ```bash
   npm run build
   ```

---

## 🏛️ Contexto Institucional
Projeto desenvolvido com fins sociais e educativos no âmbito das atividades de extensão universitária da **UNINASSAU**, promovendo democratização do acesso a ferramentas inteligentes de estudo para jovens vestibulandos.
