/**
 * TranscriptPanel.jsx
 * ────────────────────
 * Renders the realtime conversation transcript.
 * Each turn is labeled by role: user or assistant.
 * Auto-scrolls to the latest message.
 */

import { useEffect, useRef } from "react"

export function TranscriptPanel({ conversation, isConnected }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  const isEmpty = !conversation || conversation.length === 0

  return (
    <div className="transcript-panel">
      <div className="transcript-header">
        <span className="transcript-title">Transcript</span>
        {isConnected && (
          <span className="transcript-live">
            <span className="live-dot" />
            LIVE
          </span>
        )}
      </div>

      <div className="transcript-body">
        {isEmpty && (
          <div className="transcript-empty">
            {isConnected
              ? "Listening… start speaking to begin."
              : "Connect to start a conversation."}
          </div>
        )}

        {!isEmpty && conversation.map((turn, index) => (
          <div
            key={index}
            className={`transcript-turn transcript-turn--${turn.role === "user" ? "user" : "assistant"}`}
          >
            <span className="transcript-role">
              {turn.role === "user" ? "You" : "AI"}
            </span>
            <p className="transcript-text">{turn.content}</p>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
