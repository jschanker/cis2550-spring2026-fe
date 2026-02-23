import React, { useState } from "react";

const CommandInjectionLab = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [sessionId, setSessionId] = useState(
    Math.random().toString(36).substring(2, 10),
  );
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting credentials:", { username, password, sessionId });
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/command-injection/store-credentials`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, sessionId }),
        },
      );
      console.log(res);
      const data = await res.json();
      console.log("API Response:", data);
      setResponse(data);
    } catch (err) {
      console.log("Error during API call:", err);
      setResponse({ error: "Failed to connect to server." });
    } finally {
      console.log("Request completed");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>System Access Portal</h2>
        <p style={styles.subtitle}>
          Create an account to generate your RSA security certificate.
        </p>

        <form onSubmit={handleSignUp} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Sign Up & Generate Key"}
          </button>
        </form>
      </div>

      {response && (
        <div style={styles.debugPanel}>
          <div style={styles.debugHeader}>
            <span style={styles.debugTitle}>Backend Execution Logs</span>
            <span style={styles.dotContainer}>
              <div style={{ ...styles.dot, backgroundColor: "#ff5f56" }}></div>
              <div style={{ ...styles.dot, backgroundColor: "#ffbd2e" }}></div>
              <div style={{ ...styles.dot, backgroundColor: "#27c93f" }}></div>
            </span>
          </div>
          <div style={styles.debugBody}>
            <div style={styles.logItem}>
              <span style={styles.logLabel}>Executed Command:</span>
              <code style={styles.code}>
                {response.command || "No command logged"}
              </code>
            </div>
            <hr style={styles.divider} />
            <div style={styles.logItem}>
              <span style={styles.logLabel}>Standard Output (stdout):</span>
              <pre style={styles.pre}>{response.data || "(empty)"}</pre>
            </div>
            {response.error && (
              <div style={styles.logItem}>
                <span style={{ ...styles.logLabel, color: "#f87171" }}>
                  Error Output (stderr):
                </span>
                <pre style={{ ...styles.pre, color: "#f87171" }}>
                  {response.error}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    marginBottom: "30px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 8px 0",
  },
  subtitle: { color: "#6b7280", margin: "0 0 24px 0" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#374151" },
  input: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  debugPanel: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
  },
  debugHeader: {
    backgroundColor: "#333",
    padding: "10px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  debugTitle: {
    color: "#aaa",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  dotContainer: { display: "flex", gap: "6px" },
  dot: { width: "12px", height: "12px", borderRadius: "50%" },
  debugBody: {
    padding: "16px",
    color: "#d4d4d4",
    fontSize: "14px",
    fontFamily: '"Fira Code", monospace',
  },
  logItem: { marginBottom: "12px" },
  logLabel: {
    display: "block",
    color: "#9cdcfe",
    marginBottom: "4px",
    fontSize: "12px",
  },
  code: { color: "#ce9178" },
  pre: {
    backgroundColor: "#2d2d2d",
    padding: "12px",
    borderRadius: "4px",
    margin: "4px 0",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
  },
  divider: { border: "0", borderTop: "1px solid #444", margin: "12px 0" },
};

export default CommandInjectionLab;
