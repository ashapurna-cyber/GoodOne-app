import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = 3000;

// Initialize Gemini SDK if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize Gemini AI SDK:', err);
  }
}

// System instructions for Goodie AI shopping assistant
const SYSTEM_INSTRUCTION = `
You are "Goodie AI", the intelligent and friendly AI Shopping & Support Assistant for GoodOne e-commerce.
GoodOne is India's premier online shopping destination (inspired by Flipkart) offering Mobiles, Electronics, Fashion, Home & Kitchen, Grocery, Beauty, Appliances, and Toys.

Your capabilities:
1. Provide personalized product recommendations based on user budget, category, or features.
2. Explain order status tracking, delivery times (1-3 days express), shipping fees (FREE above ₹499), and payment options (UPI, Credit/Debit Cards, NetBanking, COD, Razorpay, Stripe).
3. Explain GoodOne's Return & Refund policy (Easy 7-14 day replacements & returns, instant refund to UPI/Bank).
4. Explain GST invoicing (all products include 18% GST tax invoice for business claims).
5. Help users find discount coupons like 'GOODONE10' (10% OFF), 'WELCOME500' (₹500 OFF), 'BIGSALE25' (25% OFF).

Respond concisely, helpfully, and professionally using clean Markdown formatting. Keep answers under 150 words when possible.
`;

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'GoodOne E-Commerce', timestamp: new Date().toISOString() });
});

// AI Support Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, contextHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message parameter is required' });
    }

    if (!ai) {
      // Intelligent fallback response if GEMINI_API_KEY is not configured yet
      const fallbackReply = `Hi there! I am Goodie AI. 🛍️\n\nHow can I help you today on GoodOne?\n- **Product Questions**: Ask for top smartphones, laptops, fashion or deals.\n- **Discounts**: Use code \`GOODONE10\` for 10% off at checkout!\n- **Order Support**: Check order status, delivery estimator, or GST invoices.\n\n*(Note: For live real-time AI responses, ensure GEMINI_API_KEY is configured in Settings > Secrets).*`;
      return res.json({ reply: fallbackReply });
    }

    const contents = contextHistory && Array.isArray(contextHistory) && contextHistory.length > 0
      ? [...contextHistory, { role: 'user', parts: [{ text: message }] }]
      : message;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: typeof contents === 'string' ? contents : JSON.stringify(contents),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I am happy to assist you with your shopping on GoodOne!';
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error handling /api/chat Gemini request:', error);
    res.status(500).json({
      error: 'AI service temporary issue',
      reply: 'I apologize, I am experiencing a temporary connection glitch. However, you can use coupon code **GOODONE10** for 10% off, or track your orders in the My Orders tab!'
    });
  }
});

// Vite Middleware for Dev vs Production Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GoodOne E-Commerce Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
