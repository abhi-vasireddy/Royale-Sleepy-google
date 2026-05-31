import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      
      const systemInstruction = `You are a helpful, luxury AI assistant for 'Royale Sleepy', a premium mattress showroom in Berhampur, Odisha, India. 
      Your goal is to increase walk-in customers and generate WhatsApp inquiries. 
      Keep your tone elegant, calm, modern, and highly professional.
      Ask customers about their mattress preferences, budget, and size requirements. 
      Suggest mattress types (Orthopedic, Memory Foam, Spring, Hybrid) based on their needs.
      Always try to gracefully direct the customer to contact the store via WhatsApp at the end of the conversation if they seem interested.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...history,
          { role: "user", parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction,
        }
      });
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
