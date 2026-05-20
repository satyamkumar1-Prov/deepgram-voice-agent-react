/**
 * App.jsx
 * src/App.jsx
 */

import { useVoiceAgent } from "./hooks/useVoiceAgent"
import { usePlaygroundControls } from "./providers/DeepgramProvider"
import { PROVIDERS } from "./config/agentConfig"
import { Header } from "./components/Header"
import { VoiceOrb } from "./components/VoiceOrb"
import { TranscriptPanel } from "./components/TranscriptPanel"
import { ConnectButton } from "./components/ConnectButton"

export default function App() {
  const { isConnected, isConnecting, isListening, isThinking, isSpeaking, mode, conversation, error, connect, disconnect } = useVoiceAgent()

  const {
    sttProvider, setSttProvider,
    sttModel, setSttModel,
    llmProvider, setLlmProvider,
    llmModel, setLlmModel,
    ttsProvider, setTtsProvider,
    ttsModel, setTtsModel,
    promptText, setPromptText
  } = usePlaygroundControls()

  // Handlers to auto-switch the model to the first available option when a Provider is changed
  const handleSttProviderChange = (e) => {
    const newProv = e.target.value;
    setSttProvider(newProv);
    setSttModel(PROVIDERS.stt[newProv][0].id);
  }
  const handleLlmProviderChange = (e) => {
    const newProv = e.target.value;
    setLlmProvider(newProv);
    setLlmModel(PROVIDERS.llm[newProv][0].id);
  }
  const handleTtsProviderChange = (e) => {
    const newProv = e.target.value;
    setTtsProvider(newProv);
    setTtsModel(PROVIDERS.tts[newProv][0].id);
  }

  // Helper to format provider names for the dropdown UI
  const formatName = (str) => {
    if (str === "assembly_ai") return "AssemblyAI";
    if (str === "open_ai") return "OpenAI";
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="app">
      <Header isConnected={isConnected} isConnecting={isConnecting} mode={mode} error={error} />

      {/* CHANGED: Expanded sidebar width to 480px for a spacious, professional layout */}
      <main className="app-main" style={{ display: "grid", gridTemplateColumns: "480px 1fr 340px", gap: "0", overflow: "hidden" }}>
        
        {/* MULTI-PROVIDER SIDEBAR */}
        <section className="playground-sidebar" style={{ padding: "32px", background: "rgba(8,12,20,0.5)", borderRight: "1px solid var(--border)", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
            Playground Configurations
          </h3>
          
          {/* STT SELECTION */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "var(--bg-raised)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <label style={{ fontSize: "11px", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Transcription (STT)</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <select disabled={isConnected || isConnecting} value={sttProvider} onChange={handleSttProviderChange} style={{ flex: 1, background: "var(--bg-surface)", color: "var(--text-primary)", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-bright)", cursor: "pointer", outline: "none" }}>
                {Object.keys(PROVIDERS.stt).map(key => <option key={key} value={key}>{formatName(key)}</option>)}
              </select>
              <select disabled={isConnected || isConnecting} value={sttModel} onChange={(e) => setSttModel(e.target.value)} style={{ flex: 1.5, background: "var(--bg-surface)", color: "var(--text-primary)", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-bright)", cursor: "pointer", outline: "none" }}>
                {PROVIDERS.stt[sttProvider].map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          {/* LLM SELECTION */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "var(--bg-raised)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <label style={{ fontSize: "11px", color: "var(--accent-violet)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Intelligence (LLM)</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <select disabled={isConnected || isConnecting} value={llmProvider} onChange={handleLlmProviderChange} style={{ flex: 1, background: "var(--bg-surface)", color: "var(--text-primary)", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-bright)", cursor: "pointer", outline: "none" }}>
                {Object.keys(PROVIDERS.llm).map(key => <option key={key} value={key}>{formatName(key)}</option>)}
              </select>
              <select disabled={isConnected || isConnecting} value={llmModel} onChange={(e) => setLlmModel(e.target.value)} style={{ flex: 1.5, background: "var(--bg-surface)", color: "var(--text-primary)", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-bright)", cursor: "pointer", outline: "none" }}>
                {PROVIDERS.llm[llmProvider].map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          {/* TTS SELECTION */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "var(--bg-raised)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <label style={{ fontSize: "11px", color: "var(--accent-blue)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Voice Synthesis (TTS)</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <select disabled={isConnected || isConnecting} value={ttsProvider} onChange={handleTtsProviderChange} style={{ flex: 1, background: "var(--bg-surface)", color: "var(--text-primary)", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-bright)", cursor: "pointer", outline: "none" }}>
                {Object.keys(PROVIDERS.tts).map(key => <option key={key} value={key}>{formatName(key)}</option>)}
              </select>
              <select disabled={isConnected || isConnecting} value={ttsModel} onChange={(e) => setTtsModel(e.target.value)} style={{ flex: 1.5, background: "var(--bg-surface)", color: "var(--text-primary)", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-bright)", cursor: "pointer", outline: "none" }}>
                {PROVIDERS.tts[ttsProvider].map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          {/* PROMPT EDITOR - FIXED OVERFLOW BUG */}
          {/* Added minHeight: 0 and minWidth: 0 to force Flexbox to respect container boundaries */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, minHeight: 0, minWidth: 0 }}>
            <label style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>System Instructions</label>
            <textarea 
              disabled={isConnected || isConnecting} 
              value={promptText} 
              onChange={(e) => setPromptText(e.target.value)} 
              style={{ 
                width: "100%", 
                flex: 1, 
                background: "var(--bg-raised)", 
                color: "var(--text-primary)", 
                padding: "16px", 
                borderRadius: "8px", 
                border: "1px solid var(--border)", 
                fontFamily: "var(--font-mono)", 
                fontSize: "12px", 
                resize: "none", 
                lineHeight: "1.5",
                boxSizing: "border-box", // Forces padding inside the box
                overflowY: "auto"
              }} 
            />
          </div>
        </section>

        {/* ORB SECTION */}
        <div className="orb-section" style={{ borderRight: "1px solid var(--border)" }}>
          <VoiceOrb isConnected={isConnected} isListening={isListening} isThinking={isThinking} isSpeaking={isSpeaking} />
          <ConnectButton isConnected={isConnected} isConnecting={isConnecting} onConnect={connect} onDisconnect={disconnect} />
        </div>

        {/* TRANSCRIPT SECTION */}
        <div className="transcript-section">
          <TranscriptPanel conversation={conversation} isConnected={isConnected} />
        </div>
      </main>
    </div>
  )
}