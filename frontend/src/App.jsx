import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./component/main";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Main />} />

      </Routes>
    </Router>
  );
}

export default App;
