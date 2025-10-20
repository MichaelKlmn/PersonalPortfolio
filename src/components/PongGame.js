import React, { useRef, useEffect } from "react";
import "../App.css";

const PongGame = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const keys = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    // --- Game variables ---
    let paddleWidth = 10;
    let paddleHeight = 70;
    let ballSize = 10;

    let playerY = canvas.height / 2 - paddleHeight / 2;
    let aiY = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 4;
    let ballSpeedY = 0;
    let playerScore = 0;
    let aiScore = 0;
    let countdown = 0;
    let gameStarted = false;

    // --- Drawing helpers ---
    const drawRect = (x, y, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    };

    const drawCircle = (x, y, r, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    };

    const drawText = (text, x, y, color, size = 20, align = "left") => {
      ctx.fillStyle = color;
      ctx.font = `${size}px Inter`;
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
    };

    // --- Reset ball with countdown ---
    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = 0;
      countdown = 3; // countdown before serve
    };

    // --- Game Loop ---
    const gameLoop = () => {
      // --- Clear screen ---
      drawRect(0, 0, canvas.width, canvas.height, "#ffffff");

      // --- If game not started yet ---
      if (!gameStarted) {
        drawText(
          "Click to Start",
          canvas.width / 2,
          canvas.height / 2,
          "#555",
          22,
          "center"
        );
        requestRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // --- Countdown phase ---
      if (countdown > 0) {
        drawText(
          Math.ceil(countdown),
          canvas.width / 2,
          canvas.height / 2,
          "#7a00cc",
          48,
          "center"
        );
        countdown -= 0.03; // decrease roughly once per frame
        drawRect(0, playerY, paddleWidth, paddleHeight, "#7a00cc");
        drawRect(
          canvas.width - paddleWidth,
          aiY,
          paddleWidth,
          paddleHeight,
          "#7a00cc"
        );
        drawText(playerScore, canvas.width / 4, 40, "#7a00cc", 22, "center");
        drawText(aiScore, (3 * canvas.width) / 4, 40, "#7a00cc", 22, "center");
        requestRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // --- "GO!" phase for 1 second ---
      if (countdown <= 0 && countdown > -1) {
        drawText(
          "GO!",
          canvas.width / 2,
          canvas.height / 2,
          "#7a00cc",
          40,
          "center"
        );
        drawRect(0, playerY, paddleWidth, paddleHeight, "#7a00cc");
        drawRect(
          canvas.width - paddleWidth,
          aiY,
          paddleWidth,
          paddleHeight,
          "#7a00cc"
        );
        drawText(playerScore, canvas.width / 4, 40, "#7a00cc", 22, "center");
        drawText(aiScore, (3 * canvas.width) / 4, 40, "#7a00cc", 22, "center");
        countdown -= 0.03;
        requestRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // --- Launch ball after countdown + GO phase ---
      if (countdown <= -1 && ballSpeedY === 0) {
        ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
      }

      // --- Player movement ---
      if (keys.current["ArrowUp"] && playerY > 0) playerY -= 6;
      if (keys.current["ArrowDown"] && playerY < canvas.height - paddleHeight)
        playerY += 6;

      // --- Smooth AI movement ---
      const reactionSpeed = 0.07; // smaller = slower AI reaction
      const targetY = ballY - paddleHeight / 2;
      aiY += (targetY - aiY) * reactionSpeed;
      aiY = Math.max(0, Math.min(aiY, canvas.height - paddleHeight));

      // --- Move ball ---
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // --- Wall collision (top/bottom) ---
      if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }

      // --- Player paddle collision ---
      if (
        ballSpeedX < 0 &&
        ballX - ballSize <= paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
      ) {
        ballX = paddleWidth + ballSize;
        ballSpeedX = -ballSpeedX;
        ballSpeedY += (Math.random() - 0.5) * 2;
      }

      // --- AI paddle collision ---
      if (
        ballSpeedX > 0 &&
        ballX + ballSize >= canvas.width - paddleWidth &&
        ballY > aiY &&
        ballY < aiY + paddleHeight
      ) {
        ballX = canvas.width - paddleWidth - ballSize;
        ballSpeedX = -ballSpeedX;
        ballSpeedY += (Math.random() - 0.5) * 2;
      }

      // --- Scoring (only count when ball leaves play area) ---
      if (ballX + ballSize < 0) {
        aiScore++;
        resetBall();
      } else if (ballX - ballSize > canvas.width) {
        playerScore++;
        resetBall();
      }

      // --- Draw everything ---
      drawRect(0, playerY, paddleWidth, paddleHeight, "#7a00cc");
      drawRect(
        canvas.width - paddleWidth,
        aiY,
        paddleWidth,
        paddleHeight,
        "#7a00cc"
      );
      drawCircle(ballX, ballY, ballSize, "#7a00cc");
      drawText(playerScore, canvas.width / 4, 40, "#7a00cc", 22, "center");
      drawText(aiScore, (3 * canvas.width) / 4, 40, "#7a00cc", 22, "center");

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    // --- Controls ---
    const keyDown = (e) => (keys.current[e.key] = true);
    const keyUp = (e) => (keys.current[e.key] = false);
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    // --- Start game on click ---
    const startGame = () => {
      if (!gameStarted) {
        gameStarted = true;
        countdown = 3; // Start countdown on click
      }
    };

    canvas.addEventListener("click", startGame);

    // --- Start loop ---
    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
      canvas.removeEventListener("click", startGame);
    };
  }, []);

  return <canvas ref={canvasRef} className="pong-canvas" />;
};

export default PongGame;
