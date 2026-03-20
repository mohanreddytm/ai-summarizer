import OpenAI from "openai";
import { buildPrompt } from "./prompt.js";

const apiKey = process.env.OPENAI_API_KEY;
const isOpenRouterKey = typeof apiKey === "string" && apiKey.startsWith("sk-or-");

// openai SDK is compatible with OpenAI-like providers; for OpenRouter keys
// use their baseURL. For normal OpenAI keys, leave baseURL undefined.
const openai = new OpenAI({
  apiKey,
  baseURL: isOpenRouterKey ? "https://openrouter.ai/api/v1" : undefined,
});

export async function summarizeText(userText) {
  const prompt = buildPrompt(userText);

  // Keep this interview-friendly: choose a sensible model per provider.
  const model = isOpenRouterKey ? "gpt-5-nano" : "gpt-4o-mini";

  const response = await openai.responses.create({
    model,
    input: prompt,
    temperature: 0,
  });

  const content = response.output_text;

  if (!content) {
    throw new Error("Empty response from LLM.");
  }

  return content;
}

