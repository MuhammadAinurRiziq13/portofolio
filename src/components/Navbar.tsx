import { useState } from "react";
import { navLinks } from "../data/portfolio";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <button
            className="navbar-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            RI<span>ZIQ</span>.
          </button>

          {/* Desktop Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="navbar-link"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="navbar-mobile-link"
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
