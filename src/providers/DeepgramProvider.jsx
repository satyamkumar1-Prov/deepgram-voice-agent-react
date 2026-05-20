/**
 * DeepgramProvider.jsx
 * src/providers/DeepgramProvider.jsx
 */

import { createContext, useState, useContext } from "react"
import { AgentProvider } from "@deepgram/react"
import { DEFAULT_PROMPT, buildRuntimeConfig, PROVIDERS } from "../config/agentConfig"

const PlaygroundContext = createContext(null)

export function usePlaygroundControls() {
  return useContext(PlaygroundContext)
}

export function DeepgramProvider({ children }) {
  const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY

  // We set the defaults to Deepgram/Google to ensure a successful first connection
  const [sttProvider, setSttProvider] = useState("deepgram")
  const [sttModel, setSttModel] = useState(PROVIDERS.stt["deepgram"][0].id)

  const [llmProvider, setLlmProvider] = useState("google")
  const [llmModel, setLlmModel] = useState(PROVIDERS.llm["google"][0].id)

  const [ttsProvider, setTtsProvider] = useState("deepgram")
  const [ttsModel, setTtsModel] = useState(PROVIDERS.tts["deepgram"][0].id)

  const [promptText, setPromptText] = useState(DEFAULT_PROMPT)

  if (!DEEPGRAM_API_KEY || DEEPGRAM_API_KEY === "your_deepgram_api_key_here") {
    return (
      <div className="env-error">
        <div className="env-error-card">
          <div className="env-error-icon">⚠</div>
          <h2>API Key Missing</h2>
          <p>Open your <code>.env</code> file and add a valid Deepgram key.</p>
        </div>
      </div>
    )
  }

  // Deepgram rejects assembly_ai for `listen.provider.type`, and third-party
  // TTS providers still need additional endpoint/credential wiring. Keep those
  // options visible in the UI, but fall back to a safe Deepgram config.
  const safeSttProvider = sttProvider === "assembly_ai" ? "deepgram" : sttProvider
  const safeSttModel = sttProvider === "assembly_ai" ? "nova-3" : sttModel

  const safeTtsProvider = ttsProvider !== "deepgram" ? "deepgram" : ttsProvider
  const safeTtsModel = ttsProvider !== "deepgram" ? "aura-2-thalia-en" : ttsModel

  // Compile the settings using the safe fallbacks
  const compiledAgentSettings = buildRuntimeConfig({
    sttProvider: safeSttProvider,
    sttModel: safeSttModel,
    llmProvider,
    llmModel,
    ttsProvider: safeTtsProvider,
    ttsModel: safeTtsModel,
    promptText
  })

  // Final config sent to Deepgram SDK
  const sessionConfig = {
    auth: { apiKey: DEEPGRAM_API_KEY },
    audio: {
      input: { encoding: "linear16", sampleRate: 16000 },
      output: { encoding: "linear16", sampleRate: 24000 }
    },
    ...compiledAgentSettings
  }

  return (
    <PlaygroundContext.Provider value={{
      sttProvider, setSttProvider,
      sttModel, setSttModel,
      llmProvider, setLlmProvider,
      llmModel, setLlmModel,
      ttsProvider, setTtsProvider,
      ttsModel, setTtsModel,
      promptText, setPromptText
    }}>
      <AgentProvider
        key={`${sttProvider}-${sttModel}-${llmProvider}-${llmModel}-${ttsProvider}-${ttsModel}-${promptText.length}`}
        config={sessionConfig}
        microphone={true}
        tts={true}
        playerSampleRate={24000}
        autoStart={false}
      >
        {children}
      </AgentProvider>
    </PlaygroundContext.Provider>
  )
}