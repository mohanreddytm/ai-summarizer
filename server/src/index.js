import "./loadEnv.js";
import express from "express";
import cors from "cors";
import { summarizeText } from "./llm.js";
import { validateInput, validateLlmResponse } from "./validate.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  const validation = validateInput(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const raw = await summarizeText(validation.text);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(500).json({
        error: "Model returned invalid JSON. Please try again.",
      });
    }

    const responseValidation = validateLlmResponse(parsed);
    if (!responseValidation.ok) {
      return res.status(500).json({
        error: responseValidation.error,
      });
    }

    return res.json(responseValidation.value);
  } catch (err) {
    console.error("Summarization error:", err);

    // Return helpful messages for common API errors
    const status = err.status ?? err.statusCode;
    const code = err.code ?? err.error?.code;
    if (status === 429 || code === "insufficient_quota") {
      return res.status(500).json({
        error: "OpenAI quota exceeded. Check your plan and billing at platform.openai.com.",
      });
    }
    if (status === 401 || code === "invalid_api_key") {
      return res.status(500).json({
        error: "Invalid OpenAI API key. Check your .env file.",
      });
    }

    return res.status(500).json({
      error: err.message || "Failed to summarize text.",
    });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

