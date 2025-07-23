import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'Erro ao comunicar com a IA.' });
  }
});

export default router;
