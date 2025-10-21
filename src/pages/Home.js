import React, { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";

const Home = ({ setSelected }) => {
  const [dividerExpanded, setDividerExpanded] = useState(true);

  const dividerVariants = {
    initial: { scaleY: 0, opacity: 0 },
    expanded: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
    },
    retracted: {
      scaleY: 0,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
  };

  const handleSelect = (type) => {
    setDividerExpanded(false);
    setTimeout(() => setSelected(type), 800);
  };

  return (
    <div className="home-shell">
      <div className="cta-container">
        {/* LEFT SIDE */}
        <div className="cta-side left">
          <button
            className="cta-text"
            onClick={() => handleSelect("modelling")}
          >
            Modelling
          </button>
        </div>

        {/* DIVIDER */}
        <motion.div
          className="divider-full-vertical"
          variants={dividerVariants}
          initial="initial"
          animate={dividerExpanded ? "expanded" : "retracted"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            transformOrigin: "center center",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* RIGHT SIDE */}
        <div className="cta-side right">
          <button className="cta-text" onClick={() => handleSelect("software")}>
            Software
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
