import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="title-container">
          <h1 className="title">Mi lista de películas favoritas</h1>
        </div>
      </div>
      <div className="filter-movie">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Añadir más rutas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
