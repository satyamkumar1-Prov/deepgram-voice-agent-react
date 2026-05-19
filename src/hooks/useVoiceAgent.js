/**
 * useVoiceAgent.js
 * ─────────────────
 * Centralizes all official Deepgram React SDK hooks into one reusable hook.
 * All UI components consume this — no direct SDK imports in components.
 *
 * Verified against official @deepgram/react docs:
 *
 * useAgentState()  → { state, isIdle, isConnecting, isConnected,
 *                      isReconnecting, isDisconnected, isActive, start, stop }
 *
 * useAgentMode()   → { mode, isSpeaking, isListening }
 *                    mode values: "idle" | "listening" | "speaking"
 *                    ⚠️ "thinking" is NOT an official SDK mode.
 *
 * useAgentConversation() → { conversation, clearConversation, sendUserMessage }
 *                          conversation: ConversationEntry[]
 *                          each entry: { id, role, content }
 */

import { useEffect } from "react"
import {
  useAgentState,
  useAgentConversation,
  useAgentMode,
  useAgentSession,
} from "@deepgram/react"

export function useVoiceAgent() {
  // ─── Raw session — used only for event logging ────────────────
  const session = useAgentSession()

  useEffect(() => {
    if (!session) return

    const onConnecting    = () => console.log("[SDK] connecting")
    const onConnected     = () => console.log("[SDK] connected")
    const onWelcome       = (msg) => console.log("[SDK] welcome", msg)
    const onSettingsApplied = (msg) => console.log("[SDK] settings-applied", msg)
    const onDisconnected  = (reason) =>
      console.warn("[SDK] disconnected — reason:", reason)
    const onReconnecting  = (attempt, delayMs) =>
      console.warn(`[SDK] reconnecting attempt=${attempt} delay=${delayMs}ms`)
    const onError         = (msg) => {
      console.error("[SDK] server error (raw):", msg)
      try {
        console.error("[SDK] server error (json):", JSON.stringify(msg, null, 2))
      } catch (e) {
        console.error("[SDK] server error (stringify failed):", e)
      }
    }
    const onWarning       = (msg) => {
      console.warn("[SDK] server warning (raw):", msg)
      try {
        console.warn("[SDK] server warning (json):", JSON.stringify(msg, null, 2))
      } catch {}
    }
    const onSdkError      = (err) =>
      console.error("[SDK] client error:", err)

    session.on("connecting",        onConnecting)
    session.on("connected",         onConnected)
    session.on("welcome",           onWelcome)
    session.on("settings-applied",  onSettingsApplied)
    session.on("disconnected",      onDisconnected)
    session.on("reconnecting",      onReconnecting)
    session.on("error",             onError)
    session.on("warning",           onWarning)
    session.on("sdk-error",         onSdkError)

    return () => {
      session.off("connecting",        onConnecting)
      session.off("connected",         onConnected)
      session.off("welcome",           onWelcome)
      session.off("settings-applied",  onSettingsApplied)
      session.off("disconnected",      onDisconnected)
      session.off("reconnecting",      onReconnecting)
      session.off("error",             onError)
      session.off("warning",           onWarning)
      session.off("sdk-error",         onSdkError)
    }
  }, [session])
  // ─── Connection state ──────────────────────────────────────────
  // state: "idle" | "connecting" | "connected" | "reconnecting" | "disconnected"
  const {
    state,
    isIdle,
    isConnecting,
    isConnected,
    isReconnecting,
    isDisconnected,
    isActive,
    start,
    stop,
  } = useAgentState()

  // ─── Agent mode ────────────────────────────────────────────────
  // mode: "idle" | "listening" | "speaking"
  // Transition from "speaking" → "listening" is playback-aware:
  // the SDK waits for the audio queue to fully drain before switching.
  const { mode, isSpeaking, isListening } = useAgentMode()

  // ─── Conversation transcript ───────────────────────────────────
  // conversation: Array<{ id: string, role: "user"|"assistant", content: string }>
  const { conversation, clearConversation, sendUserMessage } = useAgentConversation()

  // ─── Derived helpers ───────────────────────────────────────────
  // "thinking" is not an SDK mode. We approximate it as the window
  // between the user finishing speech and the agent starting to speak.
  // In practice: connected + not listening + not speaking = processing.
  const isThinking = isConnected && !isListening && !isSpeaking

  return {
    // ── Connection ────────────────────────────────────────────────
    state,           // raw SDK state string
    isIdle,
    isConnecting,
    isConnected,
    isReconnecting,
    isDisconnected,
    isActive,

    // ── Mode ──────────────────────────────────────────────────────
    mode,            // raw SDK mode string: "idle" | "listening" | "speaking"
    isListening,
    isSpeaking,
    isThinking,      // derived — not an official SDK mode

    // ── Conversation ──────────────────────────────────────────────
    conversation,
    clearConversation,
    sendUserMessage,

    // ── Actions ───────────────────────────────────────────────────
    // Aliased as connect/disconnect for compatibility with existing UI components
    connect:    start,
    disconnect: stop,
  }
}