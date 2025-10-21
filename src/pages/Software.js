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
      window.open("https://github.com/mkleiman", "_blank");
  };

  return (
    <motion.div
      className="software-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="page-title">Michael Kleiman | Software Projects</h1>
      <p className="about-text">
        A showcase of my development work, focusing on design, interactivity,
        and technical depth.
      </p>

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
              Built with React and Framer Motion to showcase my projects and
              design work.
            </p>
          </div>
          <img
            className="project-image"
            src={`${process.env.PUBLIC_URL}/images/website.jpg`}
            alt="Portfolio preview"
          />
        </motion.div>

        {/* Fitness Tracker App Card */}
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
            <h3>Fitness Tracker App</h3>
            <p>
              Cross-platform React Native app with MongoDB backend — track
              workouts and goals seamlessly.
            </p>
          </div>
          <img
            className="project-image"
            src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png"
            alt="Fitness app preview"
          />
        </motion.div>
      </div>

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

      <button className="back-btn" onClick={() => window.history.back()}>
        Back
      </button>
    </motion.div>
  );
};

export default Software;
