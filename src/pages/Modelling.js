import React, { useEffect, useRef, useState } from "react";
import "./Modelling.css";

const Modelling = ({ onBack }) => {
  const videoPaths = [
    `${process.env.PUBLIC_URL}/model/video1.mp4`,
    `${process.env.PUBLIC_URL}/model/video2.mp4`,
    `${process.env.PUBLIC_URL}/model/video3.mp4`,
    `${process.env.PUBLIC_URL}/model/video4.mp4`,
  ];

  // shuffle helper
  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  // randomized video queue
  const [videoQueue, setVideoQueue] = useState(shuffleArray(videoPaths));
  const [currentVideo, setCurrentVideo] = useState(0);
  const [nextVideo, setNextVideo] = useState(1);
  const [fade, setFade] = useState(true);
  const [initialFadeDone, setInitialFadeDone] = useState(false);

  const videoRef = useRef(null);
  const preloadRef = useRef(null);

  const FADE_OFFSET = 1200;
  const INITIAL_FADE_DELAY = 500;

  // === IMAGE CAROUSELS (Random order like videos) ===
  const ssenseImages = [
    `${process.env.PUBLIC_URL}/model/SSENSE1.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE2.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE3.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE4.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE5.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE6.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE7.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE8.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE9.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE10.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE11.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE12.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE13.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE14.png`,
    `${process.env.PUBLIC_URL}/model/SSENSE15.png`,
  ];

  const koreaImages = [
    `${process.env.PUBLIC_URL}/model/KOREA1.png`,
    `${process.env.PUBLIC_URL}/model/KOREA2.png`,
    `${process.env.PUBLIC_URL}/model/KOREA4.png`,
    `${process.env.PUBLIC_URL}/model/KOREA5.png`,
    `${process.env.PUBLIC_URL}/model/KOREA6.png`,
    `${process.env.PUBLIC_URL}/model/KOREA7.png`,
    `${process.env.PUBLIC_URL}/model/KOREA8.png`,
    `${process.env.PUBLIC_URL}/model/KOREA9.png`,
    `${process.env.PUBLIC_URL}/model/KOREA10.png`,
    `${process.env.PUBLIC_URL}/model/KOREA11.png`,
  ];

  const [ssenseQueue, setSsenseQueue] = useState(shuffleArray(ssenseImages));
  const [koreaQueue, setKoreaQueue] = useState(shuffleArray(koreaImages));
  const [ssenseIndex, setSsenseIndex] = useState(0);
  const [koreaIndex, setKoreaIndex] = useState(0);

  const INTERVAL = 2400; // each image shown for 2.4s

  useEffect(() => {
    const interval = setInterval(() => {
      setSsenseIndex((prev) => {
        if (prev + 1 < ssenseQueue.length) return prev + 1;
        setSsenseQueue(shuffleArray(ssenseImages));
        return 0;
      });
      setKoreaIndex((prev) => {
        if (prev + 1 < koreaQueue.length) return prev + 1;
        setKoreaQueue(shuffleArray(koreaImages));
        return 0;
      });
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [ssenseQueue, koreaQueue]);

  // === VIDEO FADE + RANDOM CYCLE ===
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!initialFadeDone) {
      setTimeout(() => setFade(false), INITIAL_FADE_DELAY);
      setInitialFadeDone(true);
    }

    const handleTimeUpdate = () => {
      if (
        video.duration &&
        video.currentTime >= video.duration - FADE_OFFSET / 1000 &&
        !fade
      ) {
        setFade(true);
      }
    };

    const handleEnded = () => {
      const newNext = nextVideo + 1 >= videoQueue.length ? 0 : nextVideo + 1;

      if (newNext === 0) {
        const reshuffled = shuffleArray(videoPaths);
        setVideoQueue(reshuffled);
      }

      setCurrentVideo(nextVideo);
      setNextVideo(newNext);
      setFade(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [fade, nextVideo, videoQueue, videoPaths, initialFadeDone]);

  useEffect(() => {
    const preloadVideo = preloadRef.current;
    if (preloadVideo) {
      preloadVideo.src = videoQueue[nextVideo];
      preloadVideo.load();
    }
  }, [nextVideo, videoQueue]);

  return (
    <div className="modelling-bg-container">
      {/* Background video */}
      <video
        key={videoQueue[currentVideo]}
        ref={videoRef}
        src={videoQueue[currentVideo]}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`modelling-video ${fade ? "fade-out" : "fade-in"}`}
      />
      <video ref={preloadRef} style={{ display: "none" }} preload="auto" />

      {/* Floating Cards */}
      <div className="card ssense-card">
        <h2 className="card-title ssense-font">SSENSE</h2>
        <p className="card-subtitle">Montreal, ON</p>
        <img
          key={ssenseQueue[ssenseIndex]}
          src={ssenseQueue[ssenseIndex]}
          alt="SSENSE"
          className="card-image"
        />
      </div>

      <div className="card korea-card">
        <h2 className="card-title">Seoul, Korea</h2>
        <p className="card-subtitle">Dunst, Heritage Floss & Afterpray</p>
        <img
          key={koreaQueue[koreaIndex]}
          src={koreaQueue[koreaIndex]}
          alt="Korean Brand"
          className="card-image"
        />
      </div>

      {/* Footer text */}
      <div className="footer-text">
        <div>MA: WANT Management</div>
        <div>IG: MichaelKlmn</div>
        <div>TikTok: MichaelKlmn</div>
      </div>

      <button className="back-button" onClick={onBack}>
        ← Back Home
      </button>
    </div>
  );
};

export default Modelling;
