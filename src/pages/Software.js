import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PongGame from "../components/PongGame";
import "../App.css";
import "./Software.css";
import HeroParticles from "../components/ParticlesBackground";

const Software = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [showStickyNav, setShowStickyNav] = useState(false);
  const [showPong, setShowPong] = useState(false);
  const gameRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Message sent!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`${data.error || "Error sending message."}`);
      }
    } catch {
      setStatus("Network error. Please try again later.");
    }
  };

  useEffect(() => {
    const heroSection = heroRef.current;
    if (!heroSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyNav(!entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const scrollToRef = (ref) => {
    const offset = -50; // adjust if your sticky navbar height changes
    const element = ref.current;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

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
      <header className={`sticky-nav ${showStickyNav ? "visible" : ""}`}>
        <nav className="nav-inner">
          <button onClick={() => (window.location.href = "/")}>
            Main Page
          </button>
          <button onClick={() => scrollToRef(heroRef)}>Home</button>
          <button onClick={() => scrollToRef(aboutRef)}>About</button>
          <button onClick={() => scrollToRef(projectsRef)}>Projects</button>
          <button onClick={() => scrollToRef(contactRef)}>Contact</button>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero-section" ref={heroRef}>
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
          <p className="hero-subtitle">A full-stack software developer.</p>
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
      <section className="skills-section" ref={aboutRef}>
        <div className="skills-left">
          <h2 className="section-heading">
            <span>About</span>
          </h2>
          <h2 className="about-blurb center-align">
            As a fourth-year software development bachelor student at Seneca
            Polytechnic, I have a strong interest in creating smart,
            user-focused web & mobile applications. With backend development
            pushing my critical thinking and problem solving skills & frontend
            allowing me to express my creativity through effective designing, I
            feel as though I am able to have an impact on both sides of the
            development coin. To further push myself, I have begun to implement
            more adaptive UI/UX that stretch both my technical and creative
            limits by incorporating AI into my projects.
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
      <section className="projects-section" ref={projectsRef}>
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
                href="https://github.com/MichaelKlmn/FoodDetectorPublic"
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
              I grew up playing/loving video games, so I figured I'd try to
              create the first ever video game! Try it out here!
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
                <div className="pong-modal-content" tabIndex={0} autoFocus>
                  <button
                    className="close-btn"
                    onClick={() => setShowPong(false)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <PongGame autoFocus />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="contact-section" ref={contactRef}>
        <h2 className="section-heading">
          <span>Contact Me</span>
        </h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
          <p className="form-status">{status}</p>
        </form>
      </section>
    </div>
  );
};

export default Software;
