import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

export default function Home({ setSelected }) {
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

  const [selection, setSelection] = React.useState(null);

  const handleSelect = (side) => {
    setSelection(side);
    setTimeout(() => setSelected(side), 800); // delay until animation finishes
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
        <AnimatePresence>
          {selection !== "software" && (
            <motion.h1
              className="cta-text"
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

        {/* Divider expanding from center */}
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

        {/* Right Text */}
        <AnimatePresence>
          {selection !== "modelling" && (
            <motion.h1
              className="cta-text"
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
