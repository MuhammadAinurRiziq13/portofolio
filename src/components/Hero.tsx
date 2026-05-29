import { personal } from "../data/portfolio";

const Hero = () => {
  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      {/* Dot grid background */}
      <div className="hero-bg" />

      {/* Decorative accent blocks */}
      <div className="hero-accent-block" />
      <div className="hero-accent-block-2" />

      <div className="hero-inner">
        {/* Main Content */}
        <div className="hero-content">
          <p className="hero-greeting">Hello, World! 👋</p>

          <h1 className="hero-name">
            I'm{" "}
            <span className="highlight">{personal.nickname}.</span>
          </h1>

          {/* Role Tags */}
          <div className="hero-roles">
            <span className="hero-role-tag">Full-Stack Dev</span>
            <span className="hero-role-tag">Flutter Dev</span>
            <span className="hero-role-tag">AI / ML Engineer</span>
            <span className="hero-role-tag">UI / UX</span>
          </div>

          <p className="hero-bio">{personal.bio}</p>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <button
              className="nb-btn nb-btn-primary"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See My Work →
            </button>
            <button
              className="nb-btn nb-btn-accent"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me ✉
            </button>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nb-btn"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Neo-Brutalism Visual — Code Card Stack */}
        <div className="hero-visual" aria-hidden="true">
          {/* Back card */}
          <div className="hero-card hero-card--back" />

          {/* Middle card */}
          <div className="hero-card hero-card--mid" />

          {/* Main code card */}
          <div className="hero-card hero-card--main">
            <div className="hero-card-bar">
              <span className="hero-card-dot" style={{ background: "#FF5757" }} />
              <span className="hero-card-dot" style={{ background: "#FFE135" }} />
              <span className="hero-card-dot" style={{ background: "#00D4AA" }} />
              <span className="hero-card-filename">riziq.ts</span>
            </div>
            <div className="hero-card-code">
              <div className="code-line">
                <span className="code-keyword">const</span>
                <span className="code-var"> dev</span>
                <span className="code-op"> = </span>
                <span className="code-brace">{"{"}</span>
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">name</span>
                <span className="code-op">: </span>
                <span className="code-str">"Riziq"</span><span className="code-op">,</span>
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">role</span>
                <span className="code-op">: </span>
                <span className="code-str">"Fullstack Dev"</span><span className="code-op">,</span>
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">stack</span>
                <span className="code-op">: </span>
                <span className="code-brace">[</span>
              </div>
              <div className="code-line code-indent-2">
                <span className="code-str">"React"</span><span className="code-op">, </span>
                <span className="code-str">"Laravel"</span><span className="code-op">,</span>
              </div>
              <div className="code-line code-indent-2">
                <span className="code-str">"Flutter"</span><span className="code-op">, </span>
                <span className="code-str">"Go"</span><span className="code-op">,</span>
              </div>
              <div className="code-line code-indent-2">
                <span className="code-str">"FastAPI"</span><span className="code-op">, </span>
                <span className="code-str">"Vue"</span><span className="code-op">,</span>
              </div>
              <div className="code-line code-indent-2">
                <span className="code-str">"Kotlin"</span> <span className="code-comment">// Android</span>
              </div>
              <div className="code-line code-indent">
                <span className="code-brace">]</span><span className="code-op">,</span>
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">gpa</span>
                <span className="code-op">: </span>
                <span className="code-num">3.85</span><span className="code-op">,</span>
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">available</span>
                <span className="code-op">: </span>
                <span className="code-bool">true</span>
              </div>
              <div className="code-line">
                <span className="code-brace">{"}"}</span><span className="code-op">;</span>
              </div>
            </div>

            {/* Status badge */}
            <div className="hero-card-status">
              <span className="hero-status-dot" />
              Available for work
            </div>
          </div>

          {/* Floating tech pills */}
          <div className="hero-float-pill hero-float-pill--1">⚡ WebRTC</div>
          <div className="hero-float-pill hero-float-pill--2">🤖 AI / ML</div>
          <div className="hero-float-pill hero-float-pill--3">🟣 Kotlin Android</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hero-scroll"
        onClick={scrollToAbout}
        role="button"
        aria-label="Scroll to about"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && scrollToAbout()}
      >
        <span>scroll</span>
        <div className="hero-scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
