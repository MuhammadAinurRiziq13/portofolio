import { useState } from "react";
import "./index.css";
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import About           from "./components/About";
import Skills          from "./components/Skills";
import Experience      from "./components/Experience";
import Projects        from "./components/Projects";
import Games           from "./components/Games";
import Certifications  from "./components/Certifications";
import Contact         from "./components/Contact";
import Footer          from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "games">("home");

  if (currentPage === "games") {
    return (
      <div className="page-transition">
        <Games onBack={() => setCurrentPage("home")} />
      </div>
    );
  }

  return (
    <div className="page-transition">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />

      {/* Floating Button */}
      <button 
        className="floating-game-btn" 
        onClick={() => setCurrentPage("games")}
        aria-label="Play Games"
      >
        <span className="floating-game-icon">🕹️</span>
        <span className="floating-game-text">Playground</span>
      </button>
    </div>
  );
}

export default App;
