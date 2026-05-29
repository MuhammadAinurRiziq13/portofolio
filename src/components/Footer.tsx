import { personal } from "../data/portfolio";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {year} <strong>{personal.nickname}</strong> — Muhammad Ainur Riziq.
        </p>
        <div className="footer-links">
          <a
            href={`mailto:${personal.email}`}
            className="footer-link"
            id="footer-email-link"
          >
            ✉ Email
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            id="footer-linkedin-link"
          >
            LinkedIn ↗
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            id="footer-github-link"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
