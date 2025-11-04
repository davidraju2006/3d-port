import React from "react";
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tech from "./components/Tech";
import Experience from "./components/Experience";
import Projects from "./components/projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hero from "./components/Hero";
import WalkingModelPage from "./pages/WalkingModelPage";


function App() {
  return (
   
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="relative z-0">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/walking" element={<WalkingModelPage />} />
          </Routes>
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">

          </div>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
