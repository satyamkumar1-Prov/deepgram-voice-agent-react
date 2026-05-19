/**
 * Header.jsx
 * ───────────
 * App branding and top navigation area.
 * Shows app name, version badge, and connection status indicator.
 */

import { StatusIndicator } from "./StatusIndicator"

export function Header({ isConnected, isConnecting, mode, error }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="header-logo">◈</span>
        <div className="header-text">
          <h1 className="header-title">Voice<span className="header-accent">AI</span></h1>
          <span className="header-version">v2 · SDK</span>
        </div>
      </div>

      <StatusIndicator
        isConnected={isConnected}
        isConnecting={isConnecting}
        mode={mode}
        error={error}
      />
    </header>
  )
}
