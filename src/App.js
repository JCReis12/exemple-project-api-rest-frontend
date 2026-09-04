import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/notes';

function App() {
  const [notas, setNotas] = useState([]);
  const [form, setForm] = useState({ titulo: '', texto: '', id: null });
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Não foi possível carregar as notas.');
      const data = await res.json();
      setNotas(data);
      setMensagem('');
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.titulo || !form.texto) return;

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    setSalvando(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: form.titulo, texto: form.texto })
      });

      if (!res.ok) throw new Error('Não foi possível salvar a nota.');
      setForm({ titulo: '', texto: '', id: null });
      setMensagem('Nota salva com sucesso.');
      await fetchNotas();
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setSalvando(false);
    }
  };

  const handleEdit = (nota) => {
    setForm({ titulo: nota.titulo, texto: nota.texto, id: nota.id });
    setMensagem('');
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Não foi possível excluir a nota.');
      setMensagem('Nota excluída.');
      await fetchNotas();
    } catch (error) {
      setMensagem(error.message);
    }
  };

  const cancelarEdicao = () => {
    setForm({ titulo: '', texto: '', id: null });
    setMensagem('');
  };

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <span className="eyebrow">ORGANIZAÇÃO PESSOAL</span>
          <h1>Suas notas</h1>
          <p className="subtitle">Ideias importantes, sempre à mão.</p>
        </div>
        <div className="note-count"><strong>{notas.length}</strong><span>{notas.length === 1 ? 'nota' : 'notas'}</span></div>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-heading">
          <div><span className="form-kicker">{form.id ? 'EDITANDO' : 'NOVA NOTA'}</span><h2>{form.id ? 'Atualize sua nota' : 'O que você quer lembrar?'}</h2></div>
          {form.id && <button type="button" onClick={cancelarEdicao} className="cancel-button">Cancelar</button>}
        </div>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" placeholder="Ex.: Ideias para o projeto" value={form.titulo} onChange={handleChange} required className="input" />
        <label htmlFor="texto">Conteúdo</label>
        <textarea id="texto" name="texto" placeholder="Escreva uma nota curta..." value={form.texto} onChange={handleChange} required className="textarea" />
        <button type="submit" className="button primary-button" disabled={salvando}>
          {salvando ? 'Salvando...' : form.id ? 'Atualizar nota' : 'Adicionar nota'}
        </button>
      </form>

      {mensagem && <p className="status-message" role="status">{mensagem}</p>}

      <section aria-labelledby="notes-heading">
        <div className="section-heading"><h2 id="notes-heading">Todas as notas</h2><span>{carregando ? 'Carregando...' : 'Mais recentes'}</span></div>
        {carregando ? <div className="empty-state">Buscando suas notas...</div> : notas.length === 0 ? <div className="empty-state">Você ainda não tem notas. Comece pela primeira acima.</div> : <div className="notas-grid">
          {notas.map((nota) => (
            <article key={nota.id} className="nota">
              <div><span className="note-mark">●</span><h3>{nota.titulo}</h3></div>
              <p>{nota.texto}</p>
              <small>{nota.criadoEm ? new Date(nota.criadoEm).toLocaleString() : 'Sem data registrada'}</small>
              <div className="nota-actions">
                <button onClick={() => handleEdit(nota)} className="button secondary-button">Editar</button>
                <button onClick={() => handleDelete(nota.id)} className="button delete-button">Excluir</button>
              </div>
            </article>
          ))}
        </div>}
      </section>
    </main>
  );
}

export default App;
