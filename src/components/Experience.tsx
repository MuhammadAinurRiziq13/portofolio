import { experiences } from "../data/portfolio";

const Experience = () => {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <p className="section-label">What I have done so far</p>
        <h2 className="section-title">
          Work <span>Experience.</span>
        </h2>

        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="timeline-item"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="timeline-date">{exp.period}</span>
                </div>
                <p className="timeline-company">@ {exp.company}</p>
                <ul className="timeline-points">
                  {exp.points.map((point, i) => (
                    <li key={i} className="timeline-point">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
