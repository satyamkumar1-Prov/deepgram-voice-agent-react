/**
 * App.jsx
 * ────────
 * Root layout component. Combines all UI sections into the full app.
 * Consumes useVoiceAgent for all SDK state — no direct SDK imports here.
 */

import { useVoiceAgent } from "./hooks/useVoiceAgent"
import { Header }         from "./components/Header"
import { VoiceOrb }       from "./components/VoiceOrb"
import { TranscriptPanel } from "./components/TranscriptPanel"
import { ConnectButton }  from "./components/ConnectButton"

export default function App() {
  const {
    isConnected,
    isConnecting,
    isListening,
    isThinking,
    isSpeaking,
    mode,
    conversation,
    error,
    connect,
    disconnect,
  } = useVoiceAgent()

  return (
    <div className="app">
      <Header
        isConnected={isConnected}
        isConnecting={isConnecting}
        mode={mode}
        error={error}
      />

      <main className="app-main">
        <div className="orb-section">
          <VoiceOrb
            isConnected={isConnected}
            isListening={isListening}
            isThinking={isThinking}
            isSpeaking={isSpeaking}
          />

          <ConnectButton
            isConnected={isConnected}
            isConnecting={isConnecting}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </div>

        <div className="transcript-section">
          <TranscriptPanel
            conversation={conversation}
            isConnected={isConnected}
          />
        </div>
      </main>

      <footer className="app-footer">
        <span>Powered by Deepgram · OpenAI · Aura TTS</span>
      </footer>
    </div>
  )
}
