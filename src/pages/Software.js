import React from "react";
import "../App.css";

const Software = () => {
  return (
    <div className="software-page">
      <h1 className="page-title">Michael Kleiman | Software Projects</h1>

      <p className="about-text">
        A showcase of my development work—focused on design, interactivity, and
        technical depth.
      </p>

      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        <div className="project-card">
          <h3>Portfolio Website</h3>
          <p>Built with React and Framer Motion.</p>
          <a
            href="https://github.com/mkleiman"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>

        <div className="project-card">
          <h3>Fitness Tracker App</h3>
          <p>Cross-platform React Native app with MongoDB backend.</p>
          <a
            href="https://github.com/mkleiman"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <button className="back-btn" onClick={() => (window.location.href = "/")}>
        Back
      </button>
    </div>
  );
};

export default Software;
