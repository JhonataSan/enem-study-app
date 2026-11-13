import { useState } from 'react';

export function CorretorRedacao() {
  const [modo, setModo] = useState('texto'); // 'texto' ou 'foto'
  const [tema, setTema] = useState('');
  const [texto, setTexto] = useState('');
  const [imagemPreview, setImagemPreview] = useState(null);
  const [imagemBase64, setImagemBase64] = useState(null);
  const [mimeType, setMimeType] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const lidarComImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setErro('A foto deve ter no máximo 4MB.');
      return;
    }

    setErro('');
    setMimeType(file.type);
    setImagemPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setImagemBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const corrigirRedacao = async () => {
    setErro('');
    setResultado('');

    if (modo === 'texto' && texto.trim().length < 50) {
      setErro('Digite ou cole uma redação com pelo menos 50 caracteres.');
      return;
    }

    if (modo === 'foto' && !imagemBase64) {
      setErro('Selecione ou tire uma foto da folha de redação.');
      return;
    }

    setCarregando(true);

    try {
      const res = await fetch('/api/corrigir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tema,
          texto: modo === 'texto' ? texto : null,
          imagemBase64: modo === 'foto' ? imagemBase64 : null,
          mimeType: modo === 'foto' ? mimeType : null
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha ao processar correção');
      }

      setResultado(data.resultado);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="corretor-container">
      <h2>Corretor de Redação ENEM (IA)</h2>
      <p className="subtitulo">
        Envie seu texto digitado ou tire uma foto da folha manuscrita para receber sua nota nas 5 competências.
      </p>

      <div className="campo-tema">
        <label>Tema da Redação (Opcional):</label>
        <input
          type="text"
          className="input-tema"
          placeholder="Ex: Desafios da saúde pública no Brasil..."
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />
      </div>

      <div className="botoes-modo" style={{ marginBottom: '20px', justifyContent: 'flex-start' }}>
        <button
          className={modo === 'texto' ? 'ativo' : ''}
          onClick={() => { setModo('texto'); setErro(''); }}
        >
          ✍️ Digitar / Colar Texto
        </button>
        <button
          className={modo === 'foto' ? 'ativo' : ''}
          onClick={() => { setModo('foto'); setErro(''); }}
        >
          📸 Enviar Foto da Folha
        </button>
      </div>

      {modo === 'texto' ? (
        <textarea
          className="textarea-anotacoes"
          style={{ height: '260px' }}
          placeholder="Cole ou escreva sua redação aqui (mínimo 7 linhas para avaliação completa)..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      ) : (
        <div className="upload-box">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            id="upload-foto"
            style={{ display: 'none' }}
            onChange={lidarComImagem}
          />
          <label htmlFor="upload-foto" className="btn-upload">
            📷 Tirar Foto ou Escolher Imagem
          </label>
          {imagemPreview && (
            <div style={{ marginTop: '15px' }}>
              <img src={imagemPreview} alt="Prévia da redação" className="preview-redacao" />
            </div>
          )}
        </div>
      )}

      {erro && <p className="msg-erro">{erro}</p>}

      <button
        className="btn-corrigir"
        onClick={corrigirRedacao}
        disabled={carregando}
      >
        {carregando ? '⏳ Analisando redação nas 5 competências...' : '✨ Corrigir Redação Agora'}
      </button>

      {resultado && (
        <div className="resultado-correcao">
          <h3>Resultado da Avaliação</h3>
          <div className="texto-resultado">{resultado}</div>
        </div>
      )}
    </div>
  );
}