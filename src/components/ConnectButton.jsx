/**
 * ConnectButton.jsx
 * ──────────────────
 * Primary control button for starting and ending a voice session.
 * Shows appropriate label and state for connecting, connected, disconnected.
 */

import { useEffect } from "react"

export function ConnectButton({ isConnected, isConnecting, onConnect, onDisconnect }) {
  useEffect(() => {
    const state = isConnecting ? "connecting" : isConnected ? "connected" : "idle"
    console.log(`[ConnectButton] State changed → ${state}`)
  }, [isConnected, isConnecting])
  const handleClick = () => {
    if (isConnected) {
      console.log("[ConnectButton] User clicked End Session — disconnecting")
      onDisconnect()
    } else if (!isConnecting) {
      console.log("[ConnectButton] User clicked Start Session — connecting")
      onConnect()
    } else {
      console.warn("[ConnectButton] Click ignored — already connecting")
    }
  }

  const getLabel = () => {
    if (isConnecting) return "Connecting…"
    if (isConnected)  return "End Session"
    return "Start Session"
  }

  const getButtonClass = () => {
    if (isConnecting) return "connect-btn connect-btn--connecting"
    if (isConnected)  return "connect-btn connect-btn--connected"
    return "connect-btn connect-btn--idle"
  }

  return (
    <button
      className={getButtonClass()}
      onClick={handleClick}
      disabled={isConnecting}
      aria-label={getLabel()}
    >
      <span className="connect-btn-icon">
        {isConnected ? "◼" : isConnecting ? "◌" : "◉"}
      </span>
      <span className="connect-btn-label">{getLabel()}</span>
    </button>
  )
}
