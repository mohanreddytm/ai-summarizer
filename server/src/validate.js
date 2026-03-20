export function validateInput(body) {
  if (!body || typeof body.text !== "string") {
    return { ok: false, error: "Request body must include a 'text' field of type string." };
  }

  const text = body.text.trim();

  if (!text) {
    return { ok: false, error: "Text must be a non-empty string." };
  }

  return { ok: true, text };
}

export function validateLlmResponse(parsed) {
  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, error: "LLM response is not a JSON object." };
  }

  const { summary, keyPoints, sentiment } = parsed;

  if (typeof summary !== "string" || !summary.trim()) {
    return { ok: false, error: "Field 'summary' must be a non-empty string." };
  }

  if (!Array.isArray(keyPoints) || keyPoints.length !== 3) {
    return { ok: false, error: "Field 'keyPoints' must be an array of exactly 3 items." };
  }

  const allowedSentiments = ["positive", "neutral", "negative"];
  if (typeof sentiment !== "string" || !allowedSentiments.includes(sentiment)) {
    return { ok: false, error: "Field 'sentiment' must be one of: positive, neutral, negative." };
  }

  return { ok: true, value: { summary, keyPoints, sentiment } };
}

