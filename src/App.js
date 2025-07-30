import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UtmBuilder from "./components/UtmBuilder";
import "./App.css";

function Home() {
  return (
    <div className="app-container">
      <h1 className="title">CX tools</h1>
      <div className="grid-container">
        <Link to="/utm" className="tool-tile">UTM Builder</Link>
        <div className="tool-tile disabled">Marketing Calendar</div>
        <div className="tool-tile disabled">AI Assistant</div>
        <div className="tool-tile disabled">Language Detector</div>
        <div className="tool-tile disabled">Polish Translator</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/utm" element={<UtmBuilder />} />
    </Routes>
  );
}

export default App;