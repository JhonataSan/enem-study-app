import { useState } from 'react';
import { AVATARES_DISPONIVEIS, CURSOS_COM_PRIORIDADES } from '../data/perfilData';

export function ModalPerfil({ perfil, estatisticas, aoSalvar, aoFechar }) {
  const [nome, setNome] = useState(perfil.nome || '');
  const [avatar, setAvatar] = useState(perfil.avatar || '🦉');
  const [cursoAlvo, setCursoAlvo] = useState(perfil.cursoAlvo || '');
  const [anoEscolar, setAnoEscolar] = useState(perfil.anoEscolar || '2º ano do Ensino Médio');
  const [metaNota, setMetaNota] = useState(perfil.metaNota || '800+');
  const [fraseMotivacional, setFraseMotivacional] = useState(
    perfil.fraseMotivacional || 'Construindo minha aprovação dia após dia.'
  );

  const salvar = (e) => {
    e.preventDefault();
    aoSalvar({
      nome: nome.trim(),
      avatar,
      cursoAlvo: cursoAlvo.trim(),
      anoEscolar,
      metaNota,
      fraseMotivacional: fraseMotivacional.trim()
    });
    aoFechar();
  };

  const dadosCurso = CURSOS_COM_PRIORIDADES[cursoAlvo] || null;

  const limparDadosDispositivo = () => {
    if (
      window.confirm(
        'Atenção: Deseja apagar todos os seus dados salvos neste navegador (tópicos, notas, redações e perfil)?'
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal-perfil-card-amplo" onClick={(e) => e.stopPropagation()}>
        <div className="modal-perfil-header">
          <div>
            <h3>Carteirinha & Perfil do Estudante</h3>
            <p className="subtitulo">Personalize sua identidade e veja suas metas estratégicas no ENEM.</p>
          </div>
          <button className="btn-fechar-modal" onClick={aoFechar}>✕</button>
        </div>

        <div className="perfil-layout-duplo">
          {/* Lado Esquerdo: Formulário de Personalização */}
          <form onSubmit={salvar} className="form-perfil-personalizado">
            {/* Escolha do Avatar */}
            <div className="campo-perfil">
              <label>Escolha o seu Avatar de Estudos:</label>
              <div className="grid-avatares-selecao">
                {AVATARES_DISPONIVEIS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    className={`btn-avatar-opcao ${avatar === av.icone ? 'selecionado' : ''}`}
                    onClick={() => setAvatar(av.icone)}
                    title={av.label}
                  >
                    <span className="emoji-avatar">{av.icone}</span>
                    <span className="label-avatar">{av.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="campo-perfil">
              <label>Nome ou como prefere ser chamado(a):</label>
              <input
                type="text"
                placeholder="Ex: Mariana, Lucas, Sofia..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="campo-perfil">
              <label>Curso ou Carreira Alvo (SISU / ProUni):</label>
              <input
                type="text"
                list="lista-cursos-enem"
                placeholder="Ex: Medicina, Direito, Computação..."
                value={cursoAlvo}
                onChange={(e) => setCursoAlvo(e.target.value)}
              />
              <datalist id="lista-cursos-enem">
                {Object.keys(CURSOS_COM_PRIORIDADES).map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div className="campo-perfil-linha">
              <div className="campo-perfil">
                <label>Ano Escolar:</label>
                <select value={anoEscolar} onChange={(e) => setAnoEscolar(e.target.value)}>
                  <option value="2º ano do Ensino Médio">2º ano do Ensino Médio</option>
                  <option value="3º ano do Ensino Médio">3º ano do Ensino Médio</option>
                  <option value="1º ano do Ensino Médio">1º ano do Ensino Médio</option>
                  <option value="Vestibulando / Pré-ENEM">Vestibulando / Pré-ENEM</option>
                </select>
              </div>

              <div className="campo-perfil">
                <label>Meta de Nota Média:</label>
                <select value={metaNota} onChange={(e) => setMetaNota(e.target.value)}>
                  <option value="900+ (Excelência)">900+ (Excelência)</option>
                  <option value="850+">850+</option>
                  <option value="800+">800+</option>
                  <option value="750+">750+</option>
                  <option value="700+">700+</option>
                </select>
              </div>
            </div>

            <div className="campo-perfil">
              <label>Lema ou Frase de Foco Pessoal:</label>
              <input
                type="text"
                placeholder="Ex: Constância vence o talento."
                value={fraseMotivacional}
                onChange={(e) => setFraseMotivacional(e.target.value)}
              />
            </div>

            <div className="modal-acoes-rodape">
              <button type="submit" className="btn-salvar-perfil">
                Salvar Perfil
              </button>
              <button type="button" className="btn-cancelar-modal" onClick={aoFechar}>
                Fechar
              </button>
              <button
                type="button"
                className="btn-limpar-computador"
                onClick={limparDadosDispositivo}
              >
                Limpar dados locais
              </button>
            </div>
          </form>

          {/* Lado Direito: Preview da Carteirinha Oficial do Estudante */}
          <div className="carteirinha-preview-wrapper">
            <span className="carteirinha-label">Pré-visualização do seu Crachá:</span>
            <div className="carteirinha-card">
              <div className="carteirinha-topo">
                <div className="carteirinha-marca">
                  <span className="carteirinha-sigla">APROVA</span>
                  <span className="carteirinha-inst">UNINASSAU</span>
                </div>
                <span className="carteirinha-ano">ENEM 2026/27</span>
              </div>

              <div className="carteirinha-corpo">
                <div className="carteirinha-avatar-circulo">
                  {avatar}
                </div>
                <div className="carteirinha-titular">
                  <h4>{nome || 'Nome do Estudante'}</h4>
                  <span className="carteirinha-curso-badge">{cursoAlvo || 'Curso a Definir'}</span>
                  <span className="carteirinha-escolar">{anoEscolar}</span>
                </div>
              </div>

              {dadosCurso && (
                <div className="carteirinha-prioridades">
                  <span className="prioridade-label">Área Prioritária no SISU:</span>
                  <strong className="prioridade-valor">{dadosCurso.areaFoco}</strong>
                </div>
              )}

              <div className="carteirinha-metas-grid">
                <div className="carteirinha-meta-item">
                  <span>Meta de Nota</span>
                  <strong>{metaNota}</strong>
                </div>
                <div className="carteirinha-meta-item">
                  <span>Edital Estudado</span>
                  <strong>{estatisticas?.percentualGeral || 0}%</strong>
                </div>
                <div className="carteirinha-meta-item">
                  <span>Redações</span>
                  <strong>{estatisticas?.redacoesAvaliadas || 0}</strong>
                </div>
              </div>

              <div className="carteirinha-rodape-frase">
                <em>"{fraseMotivacional || 'Construindo minha aprovação dia após dia.'}"</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
