import { useState } from "react";
import { skills, type SkillCategory } from "../data/portfolio";

const CATEGORIES: SkillCategory[] = [
  "Language", "Frontend", "Backend", "Mobile", "Database", "DevOps & Tools"
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <p className="section-label">What I work with</p>
        <h2 className="section-title">
          Tech <span>Stack.</span>
        </h2>

        {/* Category Filter */}
        <div className="skills-filter">
          <button
            className={`skills-filter-btn ${activeCategory === "All" ? "active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All ({skills.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`skills-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} ({skills.filter((s) => s.category === cat).length})
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((skill) => (
            <div key={skill.name} className="skill-badge">
              <img
                src={skill.icon}
                alt={skill.name}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
