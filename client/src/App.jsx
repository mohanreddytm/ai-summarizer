import React, { useState } from "react";
import ResultCard from "./components/ResultCard.jsx";

const API_URL = "https://ai-summarizer-2-uq1u.onrender.com/api/summarize";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter some text to summarize.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to analyze text.");
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>AI Summarizer</h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: 24 }}>
        Paste any text below and get a one-sentence summary, three key points, and sentiment.
      </p>

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 8 }}>
          <strong>Input text</strong>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          style={{
            width: "100%",
            padding: 12,
            fontFamily: "inherit",
            fontSize: 14,
            borderRadius: 4,
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          placeholder="Type or paste text to summarize..."
        />

        {error && (
          <div style={{ marginTop: 8, color: "#b00020" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 16,
            padding: "10px 20px",
            borderRadius: 4,
            border: "none",
            backgroundColor: "#2563eb",
            color: "#fff",
            fontSize: 14,
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Summarize"}
        </button>
      </form>

      {result && (
        <ResultCard
          summary={result.summary}
          keyPoints={result.keyPoints}
          sentiment={result.sentiment}
        />
      )}
    </div>
  );
}

export default App;

