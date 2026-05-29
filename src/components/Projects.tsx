import { useState } from "react";
import { projects } from "../data/portfolio";

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (images: string[]) => {
    setCurrentImages(images);
    setCurrentIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-label">My Work</p>
        <h2 className="section-title">
          Featured <span>Projects.</span>
        </h2>

        <p style={{ color: "var(--color-muted)", fontSize: "var(--text-lg)", maxWidth: "600px", marginBottom: "var(--gap-lg)", lineHeight: 1.7 }}>
          Proyek-proyek ini mencerminkan keahlian saya — dari platform video conference real-time,
          AI colorizer batik, sistem monitoring medis, hingga aplikasi mobile dan web skala penuh.
        </p>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <article key={idx} className={`project-card ${project.highlight ? "project-card--highlight" : ""}`}>
              {/* Image */}
              <div 
                className="project-img-wrapper"
                onClick={() => openModal(project.images)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="project-img"
                  loading="lazy"
                />

                {project.images.length > 1 && (
                  <div className="project-gallery-badge">
                    📸 +{project.images.length - 1}
                  </div>
                )}

                {/* Highlight badge */}
                {project.highlight && (
                  <div className="project-highlight-badge">⭐ Highlight</div>
                )}

                {project.githubLink ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github-btn"
                    aria-label={`View ${project.name} on GitHub`}
                    title="View on GitHub"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                ) : (
                  <span className="project-private-badge">🔒 Private</span>
                )}
              </div>

              {/* Body */}
              <div className="project-body">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {modalOpen && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={closeModal}>×</button>
            <div className="project-modal-img-container">
              <img 
                src={currentImages[currentIndex]} 
                alt="Project Screenshot" 
                className="project-modal-img" 
              />
            </div>
            
            {currentImages.length > 1 && (
              <div className="project-modal-controls">
                <button className="nb-btn" onClick={prevImage}>←</button>
                <span className="project-modal-counter">
                  {currentIndex + 1} / {currentImages.length}
                </span>
                <button className="nb-btn" onClick={nextImage}>→</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
