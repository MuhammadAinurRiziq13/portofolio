import { useState, useEffect } from "react";
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

  useEffect(() => {
    const logVisitor = async () => {
      if (sessionStorage.getItem('visitorLogged')) return;

      try {
        let ip = 'Unknown';
        let location = 'Unknown';
        try {
          const res = await fetch('https://ipinfo.io/json');
          const ipData = await res.json();
          ip = ipData.ip || 'Unknown';
          location = ipData.city ? `${ipData.city}, ${ipData.country}` : 'Unknown';
        } catch (e) {
          console.error("Gagal mengambil IP:", e);
        }

        const parseUserAgent = (ua: string) => {
          let browser = "Unknown Browser";
          let os = "Unknown OS";

          if (ua.includes("Firefox")) browser = "Firefox";
          else if (ua.includes("SamsungBrowser")) browser = "Samsung Internet";
          else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
          else if (ua.includes("Edge") || ua.includes("Edg")) browser = "Edge";
          else if (ua.includes("Chrome")) browser = "Chrome";
          else if (ua.includes("Safari")) browser = "Safari";

          if (ua.includes("Windows NT 10.0")) os = "Windows 10/11";
          else if (ua.includes("Mac OS X")) os = "macOS";
          else if (ua.includes("Android")) os = "Android";
          else if (ua.includes("Linux")) os = "Linux";
          else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

          return `${browser} - ${os}`;
        };

        const rawUA = navigator.userAgent;
        const userAgent = parseUserAgent(rawUA);

        await fetch('https://script.google.com/macros/s/AKfycbxiZldmNy45p6movg-NaoCjUk0AviWzFNcuNiBhZz4F79hXC9pnseIJMnh-pzQpj7mdpg/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: ip,
            userAgent: userAgent,
            location: location
          })
        });

        sessionStorage.setItem('visitorLogged', 'true');
        
      } catch (error) {
        console.error('Error logging visitor:', error);
      }
    };

    logVisitor();
  }, []);

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
