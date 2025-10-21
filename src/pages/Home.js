import React from "react";
import { motion } from "framer-motion";
import "../App.css";

export default function Home({ setSelected }) {
  const dividerVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "100vh", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="cta-container">
        {/* Left Text */}
        <motion.h1
          className="cta-text"
          onClick={() => setSelected("modelling")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Modelling
        </motion.h1>

        {/* Animated Vertical Divider */}
        <motion.div
          className="divider-full-vertical"
          variants={dividerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Right Text */}
        <motion.h1
          className="cta-text"
          onClick={() => setSelected("software")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Software
        </motion.h1>
      </div>
    </motion.div>
  );
}
