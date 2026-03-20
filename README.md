## AI Summarizer Assignment

Minimal full-stack application that accepts unstructured text, sends it to an LLM, and returns a structured JSON summary with one-sentence summary, three key points, and sentiment.

### Tech stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **LLM API**: OpenAI-compatible API via `openai` Node SDK

### Project structure

```text
assignment-summarizer/
  client/
    src/
      App.jsx
      main.jsx
      components/ResultCard.jsx
    index.html
    package.json
  server/
    src/
      index.js
      llm.js
      prompt.js
      validate.js
    .env.example
    package.json
  README.md
```

### Setup

1. **Clone or open the project**

   From the `assignment-summarizer` folder:

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Create `.env` for backend**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set:

   ```text
   OPENAI_API_KEY=your_real_api_key
   PORT=5000
   ```

4. **Run backend**

   ```bash
   cd server
   npm run start
   ```

   The API will be available at `http://localhost:5000`.

5. **Install frontend dependencies**

   In a separate terminal:

   ```bash
   cd client
   npm install
   ```

6. **Run frontend**

   ```bash
   cd client
   npm run dev
   ```

   Vite will start on `http://localhost:5173`. The frontend is hard-coded to call the backend at `http://localhost:5000/api/summarize`.

### API used and why

- **API**: OpenAI-compatible chat completion API (`openai` Node SDK).
- **Why**: It provides strong natural language understanding and generation, and the chat completion interface works well with instruction-style prompts that demand strict JSON output.

### Prompt design (short explanation)

- The prompt:
  - Explicitly describes the desired JSON structure (fields and types).
  - Adds strict rules: one-sentence summary, exactly three key points, and a fixed set of sentiment values.
  - Emphasizes "output only JSON" and "no explanations/markdown" to reduce the chance of extra text that would break `JSON.parse`.

### Trade-offs

- **Simple UI**: Intentionally minimal styling and layout to keep focus on the assignment requirements and readability.
- **Single endpoint**: Only one `POST /api/summarize` endpoint to keep the backend easy to understand and explain.
- **No authentication**: Omitted to keep the example small and focused; suitable for a local demo or interview exercise.

### Future improvements

- Add rate limiting and input length limits to protect the API and control costs.
- Add basic authentication or API keys if exposed beyond local development.
- Improve validation and retries for malformed LLM responses (e.g., attempt to fix near-valid JSON).
- Add tests for `validate.js` and the summarize route.
- Add simple styling or component library for a more polished UI.

### Example output

Example JSON returned by the API for a product review-style input:

```json
{
  "summary": "The user is generally happy with the laptop but notes a few drawbacks.",
  "keyPoints": [
    "Strong performance and battery life",
    "Screen quality is good but not exceptional",
    "Fan can be noisy under heavy load"
  ],
  "sentiment": "positive"
}
```

