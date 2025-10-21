import React, { useState } from "react";
import { motion } from "framer-motion";
import PongGame from "../components/PongGame";
import "../App.css";

const Software = () => {
  const [showPong, setShowPong] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const handleCardClick = (type) => {
    if (type === "pong") setShowPong(true);
    if (type === "portfolio")
      window.open("https://github.com/MichaelKlmn/PersonalPortfolio", "_blank");
    if (type === "fitness")
      window.open("https://github.com/mkleiman/Eventure", "_blank");
    if (type === "scanner")
      window.open("https://github.com/mkleiman/AIProductScanner", "_blank");
  };

  return (
    <motion.div
      className="software-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* === ABOUT SECTION === */}
      <div className="about-section">
        <h1 className="page-title">Michael Kleiman | Software Development</h1>
        <p className="about-text">
          Hi, I’m <strong>Michael Kleiman</strong> — a third-year Software
          Development student at <strong>Seneca Polytechnic</strong>, passionate
          about creating dynamic, user-centered digital experiences that merge
          design and functionality. I specialize in full-stack development,
          React Native mobile apps, and AI-powered interfaces.
        </p>

        <p className="about-body">
          I’m driven by building intuitive and intelligent systems that connect
          people and technology. My expertise includes{" "}
          <strong>React, Node.js, MongoDB, Python, and Firebase ML Kit</strong>,
          with interests in <strong>AI, AR/VR,</strong> and creative technology.
        </p>
      </div>

      {/* === PROJECTS SECTION === */}
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {/* Pong Game Card */}
        <motion.div
          className="project-card clickable"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          onClick={() => handleCardClick("pong")}
        >
          <div className="project-card-content">
            <h3>Pong Game</h3>
            <p>Classic Pong implemented in React Canvas — play right here!</p>
          </div>
          <img
            className="project-image"
            src={`${process.env.PUBLIC_URL}/images/PONG.png`}
            alt="Pong preview"
          />
        </motion.div>

        {/* Portfolio Website Card */}
        <motion.div
          className="project-card clickable"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          onClick={() => handleCardClick("portfolio")}
        >
          <div className="project-card-content">
            <h3>Portfolio Website</h3>
            <p>
              My personal site built with React and Framer Motion — a living
              showcase of my work and design experiments.
            </p>
          </div>
          <img
            className="project-image"
            src={`${process.env.PUBLIC_URL}/images/website.jpg`}
            alt="Portfolio preview"
          />
        </motion.div>

        {/* Fitness Tracker App */}
        <motion.div
          className="project-card clickable"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          onClick={() => handleCardClick("fitness")}
        >
          <div className="project-card-content">
            <h3>Eventure</h3>
            <p>
              A gamified fitness tracker using React Native, MongoDB, and ML Kit
              for smart workout tracking.
            </p>
          </div>
          <img
            className="project-image"
            src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png"
            alt="Fitness app preview"
          />
        </motion.div>

        {/* AI Product Scanner */}
        <motion.div
          className="project-card clickable"
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          onClick={() => handleCardClick("scanner")}
        >
          <div className="project-card-content">
            <h3>AI Product Scanner</h3>
            <p>
              AI app that scans product labels, analyzes ingredients, and
              provides health and transparency data in real time.
            </p>
          </div>
          <img
            className="project-image"
            src="https://cdn-icons-png.flaticon.com/512/9408/9408218.png"
            alt="AI scanner preview"
          />
        </motion.div>
      </div>

      {/* === PONG OVERLAY === */}
      {showPong && (
        <div className="pong-overlay" onClick={() => setShowPong(false)}>
          <div className="pong-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Play Pong</h3>
            <PongGame />
            <button className="back-btn" onClick={() => setShowPong(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* === BACK BUTTON === */}
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>
    </motion.div>
  );
};

export default Software;
