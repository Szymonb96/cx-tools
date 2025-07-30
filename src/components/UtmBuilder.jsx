import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UtmBuilder.css";

const presets = {
  "Sales push": {
    utm_source: "braze_sales",
    utm_medium: "notification",
  },
  "Automation push": {
    utm_source: "automation",
    utm_medium: "notification",
  }
};

function UtmBuilder() {
  const navigate = useNavigate();
  const [baseUrl, setBaseUrl] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const [linkHistory, setLinkHistory] = useState(
    JSON.parse(localStorage.getItem("utm_history")) || []
  );

  const handleGenerate = () => {
    if (!baseUrl || !utmSource || !utmMedium || !utmCampaign) return;
    const url = `${baseUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_campaign=${utmContent}`;
    setGeneratedUrl(url);

    const updatedHistory = [url, ...linkHistory].slice(0, 10);
    setLinkHistory(updatedHistory);
    localStorage.setItem("utm_history", JSON.stringify(updatedHistory));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  const applyPreset = (e) => {
    const selected = e.target.value;
    if (presets[selected]) {
      setUtmSource(presets[selected].utm_source);
      setUtmMedium(presets[selected].utm_medium);
    }
  };

  const clearHistory = () => {
    setLinkHistory([]);
    localStorage.removeItem("utm_history");
  };

  return (
    <div className="utm-builder">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h2>UTM Builder</h2>

      <div className="form-group">
        <label>Base URL</label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="e.g. https://example.com"
        />
      </div>

      <div className="form-group">
        <label>Preset</label>
        <select onChange={applyPreset} defaultValue="">
          <option value="" disabled>Select preset...</option>
          {Object.keys(presets).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>utm_source</label>
        <input
          type="text"
          value={utmSource}
          onChange={(e) => setUtmSource(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>utm_medium</label>
        <input
          type="text"
          value={utmMedium}
          onChange={(e) => setUtmMedium(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>utm_campaign</label>
        <input
          type="text"
          value={utmCampaign}
          onChange={(e) => setUtmCampaign(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>utm_content</label>
        <input
          type="text"
          value={utmContent}
          onChange={(e) => setUtmContent(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="generate-btn" onClick={handleGenerate}>
          Generate Link
        </button>
        <button className="history-btn" onClick={() => setHistoryModalOpen(true)}>
          Show History
        </button>
      </div>

      {generatedUrl && (
        <div className="result-box">
          <div>{generatedUrl}</div>
          <button onClick={() => handleCopy(generatedUrl)}>Copy</button>
        </div>
      )}

      {historyModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Recently Generated Links</h3>

            {linkHistory.length === 0 ? (
              <p className="no-links">No links in history.</p>
            ) : (
              <div className="link-list">
                {linkHistory.map((link, index) => (
                  <div key={index} className="link-box">
                    <div className="link-text">{link}</div>
                    <div className="link-buttons">
                      <button onClick={() => handleCopy(link)}>Copy</button>
                      <a href={link} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <button className="clear-btn" onClick={clearHistory}>
                🗑 Clear history
              </button>
              <button className="close-btn" onClick={() => setHistoryModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UtmBuilder;
