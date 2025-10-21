import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PongGame from "../components/PongGame"; // <<— use your component directly
import "../App.css";
import "./Software.css";
import { createPortal } from "react-dom";

function HeroParticles() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, radius: 140 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;
    let w, h;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const NUM = 70;
    const MAX_SPEED = 0.35;
    const LINK_DIST = 120;
    const particles = [];

    function resize() {
      w = canvas.parentElement.clientWidth;
      h = canvas.parentElement.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < NUM; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-MAX_SPEED, MAX_SPEED),
          vy: rand(-MAX_SPEED, MAX_SPEED),
          r: rand(1, 2),
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = 0.28 * (1 - d / LINK_DIST);
            ctx.strokeStyle = `rgba(203,195,227,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (mouse.current.x > -999) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d = Math.hypot(dx, dy);
          if (d < mouse.current.radius) {
            const alpha = 0.35 * (1 - d / mouse.current.radius);
            ctx.strokeStyle = `rgba(203,195,227,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = "rgba(203,195,227,0.65)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    const onResize = () => {
      resize();
      initParticles();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    resize();
    initParticles();
    draw();
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas className="hero-particles-canvas" ref={canvasRef} />;
}

function PortalModal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

const Software = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const [showPong, setShowPong] = useState(false);
  const gameRef = useRef(null);

  // Lock scroll + block arrow/space keys + ESC to close while modal open
  useEffect(() => {
    if (!showPong) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      // allow PongGame to handle Arrow keys
      if (e.key === "Escape") {
        e.preventDefault();
        setShowPong(false);
        return;
      }

      // block page scrolling but not ArrowUp/ArrowDown
      const blocked = [" ", "Spacebar", "PageUp", "PageDown"];
      if (blocked.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [showPong]);

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const skills = [
    { label: "JavaScript", src: "/images/tech/js.png" },
    { label: "HTML", src: "/images/tech/html.png" },
    { label: "CSS", src: "/images/tech/CSS.png" },
    { label: "React", src: "/images/tech/react.png" },
    { label: "MongoDB", src: "/images/tech/mongo.png" },
    { label: "Express.js", src: "/images/tech/express.png" },
    { label: "Git", src: "/images/tech/git.png" },
    { label: "Node.js", src: "/images/tech/node.png" },
    { label: "Next.js", src: "/images/tech/nextjs.png" },
    { label: "C++", src: "/images/tech/c++.png" },
  ];

  return (
    <div className="software-page--dark">
      {/* HERO */}
      <section className="hero-section">
        <HeroParticles />
        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="hero-title">
            Hello, I’m <span className="accent">Michael</span>.
          </h1>
          <p className="hero-subtitle">I’m a full-stack software developer.</p>
          <motion.button
            className="hero-cta"
            whileHover={{ y: -2 }}
            onClick={() => scrollTo(aboutRef)}
          >
            View my work <span className="arrow">↓</span>
          </motion.button>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="about-section" ref={aboutRef}>
        <h2 className="section-heading">
          <span>About</span>
        </h2>
        <h1 className="about-blurb center-align">
          I’m a third-year Software Development student at Seneca Polytechnic,
          focused on building intelligent, user-centered apps across web and
          mobile. I enjoy React, Node, MongoDB, and practical ML with Firebase
          ML Kit.
        </h1>
      </section>

      {/* SKILLS */}
      <section className="skills-section" ref={skillsRef}>
        <div className="skills-left">
          <h2 className="section-heading smaller">
            <span>About</span>
          </h2>
          <h2 className="skills-about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </h2>
        </div>

        <div className="skills-right">
          <div className="skills-columns">
            {/* Left Column */}
            <div className="skills-col">
              {["HTML", "React", "Express.js"].map((name) => {
                const s = skills.find((x) => x.label === name);
                return (
                  <motion.div
                    key={s.label}
                    className="skill-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <div className="skill-inner">
                      <img src={s.src} alt={s.label} className="skill-icon" />
                    </div>
                    <div className="skill-label">{s.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Middle Column (raised) */}
            <div className="skills-col raised">
              {["JavaScript", "CSS", "MongoDB", "C++"].map((name) => {
                const s = skills.find((x) => x.label === name);
                return (
                  <motion.div
                    key={s.label}
                    className="skill-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <div className="skill-inner">
                      <img src={s.src} alt={s.label} className="skill-icon" />
                    </div>
                    <div className="skill-label">{s.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="skills-col">
              {["Git", "Node.js", "Next.js"].map((name) => {
                const s = skills.find((x) => x.label === name);
                return (
                  <motion.div
                    key={s.label}
                    className="skill-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <div className="skill-inner">
                      <img src={s.src} alt={s.label} className="skill-icon" />
                    </div>
                    <div className="skill-label">{s.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects-section">
        <h2 className="section-heading">
          <span>Projects</span>
        </h2>

        {/* Project 1 */}
        <div className="project-card">
          <div className="project-image">
            <img src="/images/tech/ML.png" alt="AI Recipe & Allergen App" />
          </div>
          <div className="project-info">
            <h3 className="project-title">Capstone Project - Food Detector</h3>
            <p className="project-desc">
              A full-stack AI/ML-powered site that scans food images, retrieves
              recipes, and provides allergen information. Built with React
              Native, Node.js, MongoDB, and Firebase ML Kit.
            </p>
            <div className="project-links">
              <a
                href="https://github.com/CAPSTONE-2025/Group_19"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                GITHUB
              </a>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="project-card">
          <div className="project-image">
            <img src="/images/tech/Pokéfinder.png" alt="PokéFinder" />
          </div>
          <div className="project-info">
            <h3 className="project-title">PokéFinder</h3>
            <p className="project-desc">
              A Pokémon search and discovery platform built with React and
              Node.js that allows users to look up any Pokémon and view detailed
              information, stats, and evolution data from the PokéAPI.
            </p>
            <div className="project-links">
              <a
                href="https://github.com/MichaelKlmn/PokeFinder"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                GITHUB
              </a>
            </div>
          </div>
        </div>

        {/* Project 3: Playable Pong */}
        <div className="project-card">
          <div className="project-image">
            <img src="/images/tech/Pong.png" alt="Playable Pong Game" />
          </div>
          <div className="project-info">
            <h3 className="project-title">Playable Pong Game</h3>
            <p className="project-desc">
              A classic Pong arcade game recreated in JavaScript with smooth
              physics and retro visuals. Try it right here!
            </p>
            <div className="project-links">
              <button
                className="project-link"
                onClick={() => {
                  setShowPong(true);
                  setTimeout(() => gameRef.current?.focus(), 100); // ensures key focus
                }}
              >
                PLAY NOW!
              </button>
            </div>
          </div>
        </div>

        {/* Modal Popup (renders PongGame component directly) */}
        <AnimatePresence>
          {showPong && (
            <motion.div
              className="pong-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="pong-modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                tabIndex={0}
                autoFocus
                onKeyDown={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => setShowPong(false)}
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Game fits perfectly inside */}
                <PortalModal>
                  <motion.div
                    className="pong-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="pong-modal-content"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ outline: "none" }}
                    >
                      <button
                        className="close-btn"
                        onClick={() => setShowPong(false)}
                        aria-label="Close"
                      >
                        ✕
                      </button>

                      {/* 🟢 Forward focus into the canvas inside PongGame */}
                      <PongGame autoFocus />
                    </motion.div>
                  </motion.div>
                </PortalModal>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Software;
