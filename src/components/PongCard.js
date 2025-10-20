import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PongGame from "./PongGame";

const PongCard = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <>
      {/* Project-style card */}
      <motion.div
        onClick={() => setShowGame(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{
          backgroundColor: "#1c1c1c",
          borderRadius: "16px",
          padding: "20px",
          color: "white",
          textAlign: "center",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          transition: "0.3s ease",
        }}
      >
        <h3>Pong Game 🎮</h3>
        <p>Click to play a classic Pong game right here!</p>
      </motion.div>

      {/* Popup modal */}
      <AnimatePresence>
        {showGame && (
          <>
            {/* Background blur layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setShowGame(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                zIndex: 998,
              }}
            />

            {/* Foreground modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#1a1a1a",
                borderRadius: "16px",
                padding: "20px",
                maxWidth: "900px",
                width: "90%",
                textAlign: "center",
                zIndex: 999,
                boxShadow: "0 0 30px rgba(0,0,0,0.6)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowGame(false)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  background: "transparent",
                  color: "white",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              <PongGame />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PongCard;
