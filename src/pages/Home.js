import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroParticles from "../components/ParticlesBackground"; // <-- make sure this file exists
import "./Home.css";

export default function Home({ setSelected }) {
  // ---------------- Animation variants (unchanged behavior) ----------------
  const dividerVariants = {
    initial: { scaleY: 0, opacity: 0, originY: 0.5 },
    animate: { scaleY: 1, opacity: 1, originY: 0.5 },
    exit: { scaleY: 0, opacity: 0, originY: 0.5 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exitLeft: {
      x: "-100vw",
      opacity: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exitRight: {
      x: "100vw",
      opacity: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  // ---------------- Local selection for the push-away animation ----------------
  const [selection, setSelection] = React.useState(null);

  const handleSelect = (side) => {
    setSelection(side);
    // allow time for the push-away animation before switching page
    setTimeout(() => setSelected(side), 800);
  };

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ------- BACKGROUND LAYERS ------- */}
      {/* Left side (Modelling) uses your image from /public/images */}
      <div
        className="background modeling-bg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/bottega.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          opacity: 1,
        }}
      />

      {/* Right side (Software) uses the same particle background as Software page */}
      <div className="background software-bg">
        <HeroParticles />
      </div>

      {/* ------- CTA / TUG-OF-WAR CONTENT ------- */}
      <div className="cta-container">
        {/* Left label: Modelling */}
        <AnimatePresence>
          {selection !== "software" && (
            <motion.h1
              className="cta-text left-text"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exitLeft"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect("modelling")}
            >
              Modelling
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Center divider (expands from middle) */}
        <AnimatePresence>
          {!selection && (
            <motion.div
              className="divider-full-vertical"
              variants={dividerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Right label: Software */}
        <AnimatePresence>
          {selection !== "modelling" && (
            <motion.h1
              className="cta-text right-text"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exitRight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect("software")}
            >
              Software
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
