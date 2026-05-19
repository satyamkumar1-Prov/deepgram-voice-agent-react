/**
 * VoiceOrb.jsx
 * ─────────────
 * Animated orb that visually reflects the current agent state.
 * States: idle, listening, thinking, speaking.
 * Uses pure CSS animations — no canvas, no WebAudio visualization.
 */

export function VoiceOrb({ isConnected, isListening, isThinking, isSpeaking }) {
  const getOrbClass = () => {
    if (!isConnected) return "orb orb--idle"
    if (isSpeaking)  return "orb orb--speaking"
    if (isThinking)  return "orb orb--thinking"
    if (isListening) return "orb orb--listening"
    return "orb orb--idle"
  }

  const getLabel = () => {
    if (!isConnected) return "Disconnected"
    if (isSpeaking)  return "Speaking"
    if (isThinking)  return "Thinking"
    if (isListening) return "Listening"
    return "Connected"
  }

  return (
    <div className="orb-container">
      <div className="orb-glow-ring" data-state={isConnected ? (isSpeaking ? "speaking" : isThinking ? "thinking" : isListening ? "listening" : "connected") : "idle"} />
      <div className={getOrbClass()}>
        <div className="orb-inner">
          <div className="orb-core" />
        </div>
      </div>
      <div className="orb-rings">
        <span className="orb-ring orb-ring--1" />
        <span className="orb-ring orb-ring--2" />
        <span className="orb-ring orb-ring--3" />
      </div>
      <p className="orb-label">{getLabel()}</p>
    </div>
  )
}
