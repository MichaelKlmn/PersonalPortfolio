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

    const paddleWidth = 10;
    const paddleHeight = 70;
    const ballSize = 10;

    let playerY = canvas.height / 2 - paddleHeight / 2;
    let aiY = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 4;
    let ballSpeedY = 4;
    let playerScore = 0;
    let aiScore = 0;
    let countdown = 3;
    let countdownActive = true;
    let countdownStarted = false;
    let justBounced = 0; // number of frames since last paddle collision

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

    const drawText = (text, x, y, color, size = "20px", align = "left") => {
      ctx.fillStyle = color;
      ctx.font = `${size} Inter`;
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
    };

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 4;
      ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 4;
      justBounced = 0;
    };

    const startCountdown = () => {
      if (countdownStarted) return;
      countdownStarted = true;

      const timer = setInterval(() => {
        countdown -= 1;
        if (countdown <= 0) {
          clearInterval(timer);
          countdownActive = false;
        }
      }, 1000);
    };

    const gameLoop = () => {
      // Draw background
      drawRect(0, 0, canvas.width, canvas.height, "black");

      // Countdown display
      if (countdownActive) {
        ctx.textAlign = "center";
        drawText(
          countdown > 0 ? countdown : "GO!",
          canvas.width / 2,
          canvas.height / 2,
          "white",
          "50px",
          "center"
        );
        requestRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Player movement
      if (keys.current["ArrowUp"] && playerY > 0) playerY -= 6;
      if (keys.current["ArrowDown"] && playerY < canvas.height - paddleHeight)
        playerY += 6;

      // AI movement
      const targetY = ballY - paddleHeight / 2;
      aiY += (targetY - aiY) * 0.07;
      aiY = Math.max(0, Math.min(aiY, canvas.height - paddleHeight));

      // Move ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;
      if (justBounced > 0) justBounced--; // cooldown countdown

      // --- Bounce off top/bottom walls ---
      if (ballY - ballSize < 0) {
        ballY = ballSize; // nudge back inside
        ballSpeedY = -ballSpeedY; // invert velocity
      } else if (ballY + ballSize > canvas.height) {
        ballY = canvas.height - ballSize; // nudge inside bottom
        ballSpeedY = -ballSpeedY;
      }

      // --- Paddle collisions ---
      // Use overlap with the ball's radius and direction checks
      let bouncedThisFrame = false;

      // Player paddle (ball moving left)
      if (
        ballX - ballSize <= paddleWidth &&
        ballSpeedX < 0 &&
        ballY + ballSize >= playerY &&
        ballY - ballSize <= playerY + paddleHeight
      ) {
        ballX = paddleWidth + ballSize; // nudge out
        ballSpeedX = Math.abs(ballSpeedX); // bounce right
        ballSpeedY += (Math.random() - 0.5) * 2;
        justBounced = 10;
        bouncedThisFrame = true;
      }

      // AI paddle (ball moving right)
      else if (
        ballX + ballSize >= canvas.width - paddleWidth &&
        ballSpeedX > 0 &&
        ballY + ballSize >= aiY &&
        ballY - ballSize <= aiY + paddleHeight
      ) {
        ballX = canvas.width - paddleWidth - ballSize; // nudge in
        ballSpeedX = -Math.abs(ballSpeedX); // bounce left
        ballSpeedY += (Math.random() - 0.5) * 2;
        justBounced = 10;
        bouncedThisFrame = true;
      }

      // --- Scoring (AFTER collision, with direction + margin)
      // Only score if we did NOT bounce this frame, the ball is fully past the wall,
      // AND it's still moving in that direction.
      if (!bouncedThisFrame && justBounced === 0) {
        if (ballX > canvas.width + ballSize * 2 && ballSpeedX > 0) {
          playerScore++;
          resetBall();
        } else if (ballX < -ballSize * 2 && ballSpeedX < 0) {
          aiScore++;
          resetBall();
        }
      }

      // Draw paddles and ball
      drawRect(0, playerY, paddleWidth, paddleHeight, "white");
      drawRect(
        canvas.width - paddleWidth,
        aiY,
        paddleWidth,
        paddleHeight,
        "white"
      );
      drawCircle(ballX, ballY, ballSize, "white");

      // Draw scores
      ctx.textAlign = "center";
      drawText(playerScore, canvas.width / 4, 40, "white", "24px", "center");
      drawText(aiScore, (3 * canvas.width) / 4, 40, "white", "24px", "center");

      // Loop
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    // Start countdown once
    startCountdown();

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
      keys.current[e.key] = true;
    });
    document.addEventListener("keyup", (e) => (keys.current[e.key] = false));

    // Start loop
    requestRef.current = requestAnimationFrame(gameLoop);

    // Cleanup
    return () => {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener(
        "keydown",
        (e) => (keys.current[e.key] = true)
      );
      document.removeEventListener(
        "keyup",
        (e) => (keys.current[e.key] = false)
      );
    };
  }, []);

  return <canvas ref={canvasRef} className="pong-canvas" />;
};

export default PongGame;
