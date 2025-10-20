import React, { useRef, useEffect, useState } from "react";

const PongGame = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("Click START to Play Pong 🎮");
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Responsive scaling
    const baseWidth = 800;
    const baseHeight = 500;
    const scale = Math.min(window.innerWidth / 1000, 1);
    canvas.width = baseWidth * scale;
    canvas.height = baseHeight * scale;

    // Ball
    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 8 * scale,
      dx: 4 * scale,
      dy: 4 * scale,
    };

    // Paddles
    const paddleWidth = 10 * scale;
    const paddleHeight = 80 * scale;
    const player = {
      x: 10 * scale,
      y: canvas.height / 2 - paddleHeight / 2,
      dy: 0,
    };
    const ai = {
      x: canvas.width - 20 * scale,
      y: canvas.height / 2 - paddleHeight / 2,
      dy: 4 * scale,
    };

    let pScore = 0;
    let aScore = 0;
    let gameRunning = true;

    const drawRect = (x, y, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    };

    const drawCircle = (x, y, r, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    const drawNet = () => {
      for (let i = 0; i < canvas.height; i += 20 * scale) {
        drawRect(canvas.width / 2 - 1, i, 2, 10 * scale, "#fff");
      }
    };

    const drawText = (text, x, y, size = 24) => {
      ctx.fillStyle = "#fff";
      ctx.font = `${size * scale}px Arial`;
      ctx.fillText(text, x, y);
    };

    const resetBall = () => {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = -ball.dx;
      ball.dy = 4 * scale * (Math.random() > 0.5 ? 1 : -1);
    };

    const keyDownHandler = (e) => {
      if (e.key === "ArrowUp") player.dy = -6 * scale;
      if (e.key === "ArrowDown") player.dy = 6 * scale;
    };

    const keyUpHandler = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") player.dy = 0;
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    const update = () => {
      if (!gameRunning) return;

      ball.x += ball.dx;
      ball.y += ball.dy;
      player.y += player.dy;

      // Collision with walls
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
        ball.dy = -ball.dy;

      // Paddle collision
      let paddle = ball.x < canvas.width / 2 ? player : ai;
      if (
        ball.x - ball.radius < paddle.x + paddleWidth &&
        ball.x + ball.radius > paddle.x &&
        ball.y < paddle.y + paddleHeight &&
        ball.y > paddle.y
      ) {
        ball.dx = -ball.dx;
      }

      // Scoring
      if (ball.x - ball.radius < 0) {
        aScore++;
        setAiScore(aScore);
        resetBall();
      } else if (ball.x + ball.radius > canvas.width) {
        pScore++;
        setPlayerScore(pScore);
        resetBall();
      }

      // AI tracking
      if (ai.y + paddleHeight / 2 < ball.y) ai.y += ai.dy;
      else ai.y -= ai.dy;

      // Prevent paddles from leaving screen
      player.y = Math.max(Math.min(player.y, canvas.height - paddleHeight), 0);
      ai.y = Math.max(Math.min(ai.y, canvas.height - paddleHeight), 0);

      // Win check
      if (pScore >= 5 || aScore >= 5) {
        gameRunning = false;
        setMessage(pScore >= 5 ? "🏆 You Win!" : "💀 You Lose!");
        setIsPlaying(false);
      }
    };

    const render = () => {
      drawRect(0, 0, canvas.width, canvas.height, "#111");
      drawNet();
      drawText(playerScore, canvas.width / 4, 40 * scale, 28);
      drawText(aiScore, (3 * canvas.width) / 4, 40 * scale, 28);
      drawRect(player.x, player.y, paddleWidth, paddleHeight, "#09f");
      drawRect(ai.x, ai.y, paddleWidth, paddleHeight, "#f33");
      drawCircle(ball.x, ball.y, ball.radius, "#fff");
    };

    const loop = () => {
      update();
      render();
      if (isPlaying) requestAnimationFrame(loop);
    };

    loop();

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [isPlaying]);

  const handleStart = () => {
    setPlayerScore(0);
    setAiScore(0);
    setMessage("");
    setIsPlaying(true);
  };

  return (
    <div
      style={{
        margin: "40px auto",
        width: "90%",
        maxWidth: "900px",
        background: "#1c1c1c",
        borderRadius: "16px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
      }}
    >
      <h2 style={{ color: "white", fontFamily: "Arial" }}>Pong Game 🎮</h2>

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          background: "#000",
          borderRadius: "10px",
          border: "3px solid #09f",
          marginTop: "10px",
        }}
      />

      {message && (
        <p style={{ color: "white", marginTop: "10px", fontSize: "18px" }}>
          {message}
        </p>
      )}

      <button
        onClick={handleStart}
        style={{
          backgroundColor: isPlaying ? "#444" : "#09f",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "15px",
          fontSize: "16px",
        }}
        disabled={isPlaying}
      >
        {isPlaying ? "Playing..." : "Start Game"}
      </button>
    </div>
  );
};

export default PongGame;
