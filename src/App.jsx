import React, { useState } from 'react';

export default function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    const res = await fetch('/api/cohere', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.reply);
    setLoading(false);
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-4 text-white"
      style={{
        backgroundImage: 'url(/magicball-bg.jpeg)', // ← использует твоё новое изображение
        backgroundSize: 'cover',                     // ← растягивает на весь экран
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <h1 className="text-4xl font-bold mb-6">Давай задавай юный криптан</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder=""
        className="w-full max-w-md p-4 rounded-xl text-black bg-white/80"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl shadow-lg"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {answer && (
        <p className="mt-8 text-xl text-center max-w-xl bg-black/70 p-4 rounded-xl">
          {answer}
        </p>
      )}
    </main>
  );
}
