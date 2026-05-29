import { certifications } from "../data/portfolio";

const Certifications = () => {
  return (
    <section id="certifications" className="section certs-section">
      <div className="container">
        <p className="section-label">Credentials</p>
        <h2 className="section-title">
          Certifi<span>cations.</span>
        </h2>

        <div className="certs-grid">
          {certifications.map((cert, idx) => (
            <div key={idx} className="cert-card">
              <span className="cert-icon">{cert.icon}</span>
              <div className="cert-info">
                <h4 className="cert-title">{cert.title}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
