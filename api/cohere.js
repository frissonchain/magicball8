export default async function handler(req, res) {
  const { question } = req.body;
  const COHERE_API_KEY = process.env.COHERE_API_KEY;

  if (!question || !question.toLowerCase().match(/(крипт|биткоин|эфир|токен|solana|bnb|doge|shib|coin|token|crypto)/)) {
  const funResponses = [
    'Эй бро, я тут только чтобы говорить о криптовалютах 🪙',
    'Шар не отвечает на житейские вопросы. Только крипта! 💸',
    'Это точно про крипту?.. Если нет — возвращайся с другим вопросом 🧿',
    'Шар занят анализом блокчейна. Попробуй спросить что-нибудь о токенах.',
    'Я предсказываю судьбу монет, а не людей 🪙😅'
  ];
  const reply = funResponses[Math.floor(Math.random() * funResponses.length)];
  return res.status(200).json({ reply });
}

  const prompt = `Ты — крипто-Магический Шар 8. Ответь кратко, стоит ли покупать токен, основываясь на текущей ситуации. Вопрос: "${question}". Заканчивай всегда: 'Шар сказал своё слово. 🧿'`;

  const cohereRes = await fetch('https://api.cohere.ai/v1/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: prompt }),
  });

  const cohereData = await cohereRes.json();
  res.status(200).json({ reply: cohereData.text || 'Что-то пошло не так...' });
}
