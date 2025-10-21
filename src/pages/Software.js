import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css"; // keep your globals
import "./Software.css"; // styles for this page only

/* ================================
   HERO PARTICLES (hero only)
   - lightweight canvas
   - particles connect to each other
   - also connect to the mouse cursor when nearby
================================ */
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

      // integrate
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // links (particle-particle)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = 0.28 * (1 - d / LINK_DIST);
            // lavender line
            const color = `rgba(203,195,227,${alpha})`; // #CBC3E3
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // links (particle-mouse)
      if (mouse.current.x > -999) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d = Math.hypot(dx, dy);
          if (d < mouse.current.radius) {
            const alpha = 0.35 * (1 - d / mouse.current.radius);
            ctx.strokeStyle = `rgba(203,195,227,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = "rgba(203,195,227,0.65)"; // #CBC3E3 with opacity
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

/* ================================
   SOFTWARE PAGE
================================ */
const Software = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // skills data (images you’ll place in /public/images/tech/*.png)
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
      {/* ============ HERO ============ */}
      <section className="hero-section">
        <HeroParticles />

        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Hello, I’m <span className="accent">Michael</span>.
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            I’m a full-stack software developer.
          </motion.p>

          <motion.button
            className="hero-cta"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => scrollTo(aboutRef)}
          >
            View my work <span className="arrow">↓</span>
          </motion.button>
        </motion.div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="about-section" ref={aboutRef}>
        <h2 className="section-heading">
          <span>About</span>
        </h2>

        <div className="about-grid">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* minimal gradient avatar outline */}
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              className="avatar-outline"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="lav" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#CBC3E3" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <circle
                cx="110"
                cy="80"
                r="40"
                fill="none"
                stroke="url(#lav)"
                strokeWidth="6"
              />
              <path
                d="M40 170c10-40 130-40 140 0"
                fill="none"
                stroke="url(#lav)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <p className="about-blurb">
              I’m a third-year Software Development student at Seneca
              Polytechnic, focused on building intelligent, user-centered apps
              across web and mobile. I enjoy React, Node, MongoDB, and practical
              ML with Firebase ML Kit.
            </p>
          </motion.div>

          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="about-blurb">
              I love combining design and engineering to craft experiences that
              feel simple, fast, and purposeful. Lately I’ve been shipping
              mobile features, exploring AI-assisted workflows, and polishing
              frontend interactions.
            </p>
            <div className="center-btn">
              <button
                className="hero-cta ghost"
                onClick={() => scrollTo(skillsRef)}
              >
                Skills <span className="arrow">↓</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SKILLS (cards like Ben’s) ============ */}
      <section className="skills-section" ref={skillsRef}>
        <h2 className="section-heading">
          <span>Skills</span>
        </h2>

        <div className="skills-grid">
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              className="skill-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
            >
              <div className="skill-inner">
                <img src={s.src} alt={s.label} className="skill-icon" />
              </div>
              <div className="skill-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Software;
