import React, { useState, useEffect } from "react";

function UtmBuilder({ goBack }) {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  // Załaduj historię po załadowaniu komponentu
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("utmHistory")) || [];
    setHistory(saved);
  }, []);

  const generateUTM = () => {
    if (!url) return "";
    const params = new URLSearchParams();
    if (source) params.append("utm_source", source);
    if (medium) params.append("utm_medium", medium);
    if (campaign) params.append("utm_campaign", campaign);
    if (term) params.append("utm_term", term);
    if (content) params.append("utm_content", content);

    return `${url}?${params.toString()}`;
  };

  const handleCopy = () => {
    const utm = generateUTM();
    if (!utm) return;
    navigator.clipboard.writeText(utm).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    // Zapisz do localStorage
    const updated = [utm, ...history].slice(0, 10);
    localStorage.setItem("utmHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "1.5rem" }}>UTM Builder</h2>

      <Input label="Base URL *" value={url} onChange={setUrl} />
      <Input label="utm_source" value={source} onChange={setSource} />
      <Input label="utm_medium" value={medium} onChange={setMedium} />
      <Input label="utm_campaign" value={campaign} onChange={setCampaign} />
      <Input label="utm_term" value={term} onChange={setTerm} />
      <Input label="utm_content" value={content} onChange={setContent} />

      <div style={{ marginTop: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Generated link:
        </label>
        <textarea
          readOnly
          style={{ width: "100%", height: "80px", padding: "0.5rem", resize: "none" }}
          value={generateUTM()}
        />
        <button
          onClick={handleCopy}
          style={{
            marginTop: "0.5rem",
            marginRight: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={() => setShowHistory(true)}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          History
        </button>
      </div>

      <button
        onClick={goBack}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#555",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back to menu
      </button>

      {showHistory && (
        <Modal onClose={() => setShowHistory(false)} links={history} />
      )}
    </div>
  );
}

const Input = ({ label, value, onChange }) => (
  <div style={{ marginBottom: "1rem" }}>
    <label style={{ display: "block", marginBottom: "0.25rem" }}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc" }}
    />
  </div>
);

const Modal = ({ onClose, links }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [currentLinks, setCurrentLinks] = useState(links);

  const handleCopy = (link, index) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  const handleClearHistory = () => {
    localStorage.removeItem("utmHistory");
    setCurrentLinks([]);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "700px",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginBottom: "1rem", fontSize: "20px" }}>
        Ostatnie wygenerowane linki
        </h3>

        {currentLinks.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#666" }}>Brak linków</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {currentLinks.map((link, index) => (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    wordBreak: "break-all",
                    color: "#333",
                  }}
                >
                  {link}
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleCopy(link, index)}
                    style={{
                      padding: "0.3rem 0.8rem",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {copiedIndex === index ? "Skopiowano!" : "Kopiuj"}
                  </button>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "0.3rem 0.8rem",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      borderRadius: "4px",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Otwórz
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
          <button
            onClick={handleClearHistory}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🗑 Wyczyść historię
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default UtmBuilder;