import { services, education } from "../data/portfolio";

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-label">Introduction</p>
        <h2 className="section-title">
          About <span>Me.</span>
        </h2>

        {/* Bio + Stats Grid */}
        <div className="about-grid">
          <div className="about-text">
            <p>
              Saya <strong>Muhammad Ainur Riziq</strong>, mahasiswa{" "}
              <strong>Teknik Informatika semester 8</strong> di{" "}
              <strong>Politeknik Negeri Malang</strong> dengan IPK{" "}
              <strong>3.85</strong>. Lahir di Lamongan, passionate di
              bidang software engineering, web, mobile, dan integrasi AI.
            </p>
            <br />
            <p>
              Saya membangun aplikasi full-stack menggunakan{" "}
              <strong>React, Vue, Laravel, FastAPI, dan Go</strong>, serta
              pengembangan mobile dengan <strong>Flutter</strong>. Familiar
              dengan teknologi real-time seperti{" "}
              <strong>WebRTC, WebSocket, dan Firebase</strong>, serta
              integrasi AI/ML ke dalam produk nyata.
            </p>
            <br />
            <p>
              Berpengalaman magang di dua perusahaan teknologi — membangun
              sistem SaaS, aplikasi audit, dan manajemen data skala industri.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="about-stats">
            <div className="about-stat-card" style={{ borderTop: "5px solid var(--accent-yellow)" }}>
              <div className="about-stat-number" style={{ color: "var(--accent-yellow)", WebkitTextStroke: "1px #0A0A0A" }}>
                7+
              </div>
              <div className="about-stat-label">Projects Built</div>
            </div>
            <div className="about-stat-card" style={{ borderTop: "5px solid var(--accent-cyan)" }}>
              <div className="about-stat-number" style={{ color: "var(--accent-cyan)", WebkitTextStroke: "1px #0A0A0A" }}>
                2×
              </div>
              <div className="about-stat-label">Internships</div>
            </div>
            <div className="about-stat-card" style={{ borderTop: "5px solid var(--accent-purple)" }}>
              <div className="about-stat-number" style={{ color: "var(--accent-purple)", WebkitTextStroke: "1px #0A0A0A" }}>
                3.85
              </div>
              <div className="about-stat-label">GPA</div>
            </div>
            <div className="about-stat-card" style={{ borderTop: "5px solid var(--accent-orange)" }}>
              <div className="about-stat-number" style={{ color: "var(--accent-orange)", WebkitTextStroke: "1px #0A0A0A" }}>
                5
              </div>
              <div className="about-stat-label">Certifications</div>
            </div>
          </div>
        </div>

        {/* Education Block */}
        <div className="education-list">
          {education.map((edu, idx) => (
            <div key={idx} className="education-card">
              <div className="education-left">
                <span className="education-icon">🎓</span>
                <div>
                  <h4 className="education-institution">{edu.institution}</h4>
                  <p className="education-major">{edu.major}</p>
                </div>
              </div>
              <div className="education-right">
                <span className="education-period">{edu.period}</span>
                {edu.gpa && (
                  <span className="education-gpa">IPK {edu.gpa}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Services / Roles */}
        <p className="section-label" style={{ marginTop: "var(--gap-lg)" }}>What I do</p>
        <div className="services-grid">
          {services.map((svc) => (
            <div key={svc.title} className="service-card">
              <span className="service-icon">{svc.icon}</span>
              <h3 className="service-title">{svc.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
