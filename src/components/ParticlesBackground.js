import React, { useRef, useEffect } from "react";

export default function HeroParticles() {
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
