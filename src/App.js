// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarouselPage from "./pages/CarouselPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/photos" element={<CarouselPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
