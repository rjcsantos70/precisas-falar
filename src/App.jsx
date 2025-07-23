import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      setResponse('Erro ao obter resposta. Tenta novamente.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto', fontFamily: 'Arial' }}>
      <h1>Precisas Falar?</h1>
      <p>Desabafa o que sentes. A IA responde com empatia.</p>
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escreve o que sentes..."
        style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'A pensar...' : 'Enviar'}
      </button>
      {response && (
        <div style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <strong>Resposta:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;