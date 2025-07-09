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
      className="flex flex-col items-center justify-center min-h-screen p-4 text-white relative"
      style={{
        backgroundImage: 'url(/magicball-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">
        Какой мусор собрался покупать сегодня?
      </h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAsk();
        }}
        placeholder=""
        className="w-full max-w-md p-4 rounded-xl text-black bg-white/80 outline-none text-center"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl shadow-lg disabled:opacity-50"
      >
        {loading ? 'Шар вибрирует...' : 'хоть бы сто иксов'}
      </button>

      {answer && (
        <p className="mt-8 text-xl text-center max-w-xl bg-black/70 p-4 rounded-xl">
          {answer}
        </p>
      )}

      <footer className="absolute bottom-4 text-xs text-white/70 flex gap-4">
        <a
          href="https://coinmarketcap.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-white transition"
        >
          NFA DYOR
        </a>
        <a
          href="https://farcaster.xyz/frissonchain.eth"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-white transition"
        >
          /frissonchain
        </a>
      </footer>
    </main>
  );
}
