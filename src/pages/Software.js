import React, { useState } from "react";
import "../App.css";
import PongGame from "../components/PongGame";
import { motion, AnimatePresence } from "framer-motion";

const Software = () => {
  const [showPong, setShowPong] = useState(false);

  return (
    <div className="software-page">
      <h1 className="page-title">Michael Kleiman | Software Projects</h1>

      <p className="about-text">
        A showcase of my development work—focused on design, interactivity, and
        technical depth.
      </p>

      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {/* Pong Project Card */}
        <div
          className="project-card"
          onClick={() => setShowPong(true)}
          style={{ cursor: "pointer" }}
        >
          <h3>Pong Game</h3>
          <p>
            A minimalist browser-based Pong built with React and HTML Canvas.
          </p>
          <p style={{ color: "#0077ff" }}>Click to Play 🎮</p>
        </div>

        {/* Example other projects */}
        <div className="project-card">
          <h3>Fitness Tracker App</h3>
          <p>Cross-platform React Native app with MongoDB backend.</p>
          <a
            href="https://github.com/MichaelKlmn"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Back button */}
      <button className="back-btn" onClick={() => (window.location.href = "/")}>
        Back
      </button>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPong && (
          <motion.div
            className="pong-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowPong(false)}
          >
            <motion.div
              className="pong-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <PongGame />
              <button className="back-btn" onClick={() => setShowPong(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Software;
