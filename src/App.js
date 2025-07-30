import React, { useState } from "react";
import UtmBuilder from "./components/UtmBuilder";
import "./App.css";

function App() {
  const [selectedTool, setSelectedTool] = useState(null);

  if (selectedTool === "utm") {
    return <UtmBuilder goBack={() => setSelectedTool(null)} />;
  }

  return (
    <div className="app-container">
      <h1 className="title">CX Tools</h1>
      <div className="grid-container">
        <button className="tool-tile" onClick={() => setSelectedTool("utm")}>
          UTM Builder
        </button>
        <button className="tool-tile disabled">
          Kalendarz Marketingowy
        </button>
        <button className="tool-tile disabled">Asystent AI</button>
        <button className="tool-tile disabled">Wykrywacz języka</button>
        <button className="tool-tile disabled">Tłumacz na PL</button>
      </div>
    </div>
  );
}

export default App;