/**
 * StatusIndicator.jsx
 * ────────────────────
 * Compact status badge showing the current connection and agent mode.
 * Appears in the corner of the UI for at-a-glance awareness.
 */

export function StatusIndicator({ isConnected, isConnecting, mode, error }) {
  const getStatus = () => {
    if (error)        return { label: "Error",       cls: "status--error"      }
    if (isConnecting) return { label: "Connecting",  cls: "status--connecting" }
    if (!isConnected) return { label: "Disconnected",cls: "status--idle"       }
    if (mode === "speaking")  return { label: "Speaking",   cls: "status--speaking"  }
    if (mode === "thinking")  return { label: "Thinking",   cls: "status--thinking"  }
    if (mode === "listening") return { label: "Listening",  cls: "status--listening" }
    return { label: "Connected", cls: "status--connected" }
  }

  const { label, cls } = getStatus()

  return (
    <div className={`status-indicator ${cls}`}>
      <span className="status-dot" />
      <span className="status-label">{error ? "Error — check console" : label}</span>
    </div>
  )
}
