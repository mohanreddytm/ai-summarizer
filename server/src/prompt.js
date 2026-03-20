export function buildPrompt(userText) {
  return `
You are an assistant that converts unstructured text into a strict JSON summary.

Return ONLY valid JSON with this exact structure:
{
  "summary": "one sentence",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "sentiment": "positive | neutral | negative"
}

Rules:
- summary must be exactly one sentence
- keyPoints must contain exactly 3 short strings
- sentiment must be exactly one of the allowed values
- do not include markdown
- do not include explanations
- output only JSON

Text:
${userText}
`.trim();
}

