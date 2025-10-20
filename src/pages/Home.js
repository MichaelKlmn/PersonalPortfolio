import React, { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate(); // ← router hook

  // Animation variants
  const buttonVariants = {
    initial: { x: 0, opacity: 1 },
    pushedLeft: { x: "-150%", opacity: 0 },
    pushedRight: { x: "150%", opacity: 0 },
  };

  return (
    <div className="App">
      {!selected && (
        <div className="cta-container">
          <motion.button
            className="cta-text"
            variants={buttonVariants}
            initial="initial"
            animate={selected === "software" ? "pushedLeft" : "initial"}
            transition={{ duration: 0.5 }}
            onClick={() => setSelected("modelling")}
          >
            Modelling
          </motion.button>

          <div className="divider"></div>

          <motion.button
            className="cta-text"
            variants={buttonVariants}
            initial="initial"
            animate={selected === "modelling" ? "pushedRight" : "initial"}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/software")} // ← use React Router navigation
          >
            Software
          </motion.button>
        </div>
      )}

      {/* MODELLING PAGE */}
      {selected === "modelling" && (
        <motion.div
          className="page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Michael Kleiman | Modelling</h1>
          <p>
            Editorial, commercial, and e-commerce work from Canada and abroad.
          </p>
          <button className="back-btn" onClick={() => setSelected(null)}>
            Back
          </button>
        </motion.div>
      )}

      {/* SOFTWARE PAGE */}
      {selected === "software" && (
        <motion.div
          className="software-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Michael Kleiman | Software Projects</h1>
          <p className="about-text">
            A showcase of my development work, focusing on design,
            interactivity, and technical depth.
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

          <button className="back-btn" onClick={() => setSelected(null)}>
            Back
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
