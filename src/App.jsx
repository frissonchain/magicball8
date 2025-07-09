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
    className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative"
    style={{
      backgroundImage: 'url(/magicball-bg.png)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <h1 className="text-3xl font-bold mb-8">Ask your question</h1>

    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 mt-12">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="px-4 py-2 rounded-xl bg-black/80 border border-white text-white w-64 text-center outline-none"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl shadow-lg disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>
    </div>

    {answer && (
      <div className="absolute bottom-12 text-xl text-center max-w-xl bg-black/70 p-4 rounded-xl">
        {answer}
      </div>
    )}
  </main>
);
