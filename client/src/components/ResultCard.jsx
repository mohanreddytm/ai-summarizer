import React from "react";

function ResultCard({ summary, keyPoints, sentiment }) {
  if (!summary && !keyPoints?.length && !sentiment) {
    return null;
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 4, padding: 16, marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Result</h2>

      <div style={{ marginBottom: 12 }}>
        <strong>Summary:</strong>
        <p style={{ marginTop: 4 }}>{summary}</p>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Key Points:</strong>
        <ul style={{ marginTop: 4, paddingLeft: 20 }}>
          {keyPoints?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Sentiment:</strong> <span>{sentiment}</span>
      </div>
    </div>
  );
}

export default ResultCard;

