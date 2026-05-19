/**
 * DeepgramProvider.jsx
 * src/providers/DeepgramProvider.jsx
 *
 * No agent_id needed. Uses inline config from agentConfig.js.
 * Only requires VITE_DEEPGRAM_API_KEY in your .env file.
 */

import { AgentProvider } from "@deepgram/react"
import { agentConfig } from "../config/agentConfig"

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY

const sessionConfig =
  DEEPGRAM_API_KEY && DEEPGRAM_API_KEY !== "your_deepgram_api_key_here"
    ? {
        auth: {
          apiKey: DEEPGRAM_API_KEY,
        },
        // EXPLICIT AUDIO SYNC: Configure server downstream cluster
        // output rate to render audio stream at high fidelity 24kHz
        audio: {
          input: {
            encoding: "linear16",
            sampleRate: 16000,
          },
          output: {
            encoding: "linear16",
            sampleRate: 24000,
          }
        },
        // Spread parameters cleanly merges your agent block object and greeting parameters parallelly
        ...agentConfig,
      }
    : null

export function DeepgramProvider({ children }) {
  if (!sessionConfig) {
    return (
      <div className="env-error">
        <div className="env-error-card">
          <div className="env-error-icon">⚠</div>
          <h2>API Key Missing</h2>
          <p>
            Open your <code>.env</code> file and add:
          </p>
          <pre>VITE_DEEPGRAM_API_KEY=dg_your_key_here</pre>
          <p>
            Then stop the server and run <code>npm run dev</code> again.
          </p>
          <p>
            Get your key at{" "}
            <a href="https://console.deepgram.com" target="_blank" rel="noreferrer">
              console.deepgram.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <AgentProvider
      config={sessionConfig}
      microphone={true}
      tts={true}
      // Audio queue decoder matches your 24000Hz sampling layout perfectly
      autoStart={false}
    >
      {children}
    </AgentProvider>
  )
}