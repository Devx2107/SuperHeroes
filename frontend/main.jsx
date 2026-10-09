import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

class ExperienceBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="error-screen">
          <p>LEGENDRIUM / ARCHIVE</p>
          <h1>The signal was interrupted.</h1>
          <p>Reload the archive to reconnect.</p>
          <button onClick={() => location.reload()}>Reconnect ↗</button>
        </main>
      );
    return this.props.children;
  }
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExperienceBoundary>
      <App />
    </ExperienceBoundary>
  </React.StrictMode>,
);
