export default async function handler(req, res) {
  const { question } = req.body;
  const COHERE_API_KEY = process.env.COHERE_API_KEY;

  if (!question || question.trim().length < 3) {
    return res.status(200).json({
      reply: 'Задай что-нибудь осмысленное 🤔',
    });
  }

  const prompt = `Ты — крипто-Магический Шар 8. 
Отвечай кратко, стоит ли покупать криптовалюту, основываясь на текущей информации.
Если вопрос НЕ касается криптовалют, честно скажи: 
"Я отвечаю только на вопросы о криптовалютах." 
Вот вопрос: "${question}" 
Заканчивай всегда фразой: "Шар сказал своё слово. 🧿"`;

  try {
    const cohereRes = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: prompt }),
    });

    const cohereData = await cohereRes.json();

    const reply = cohereData.text || 'Что-то пошло не так... Попробуй ещё раз 🌀';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Ошибка общения с Cohere:', err);
    return res.status(500).json({
      reply: '⚠️ Ошибка при обращении к ИИ. Шар временно замолчал.',
    });
  }
}
