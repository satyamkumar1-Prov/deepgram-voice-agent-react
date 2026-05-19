/**
 * main.jsx
 * ─────────
 * Application entry point. Renders the app wrapped in DeepgramProvider.
 * DeepgramProvider must be the outermost wrapper so all components
 * have access to the Deepgram SDK context.
 */

import ReactDOM from "react-dom/client"
import { DeepgramProvider } from "./providers/DeepgramProvider"
import App from "./App"
import "./styles/app.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <DeepgramProvider>
    <App />
  </DeepgramProvider>
)
