import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="title-container"></div>
      <div className="filter-movie">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Añadir más rutas */}
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
