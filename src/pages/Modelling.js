import React, { useEffect, useRef, useState } from "react";
import "./Modelling.css";

const Modelling = ({ onBack }) => {
  const videoPaths = [
    `${process.env.PUBLIC_URL}/model/video1.mp4`,
    `${process.env.PUBLIC_URL}/model/video2.mp4`,
    `${process.env.PUBLIC_URL}/model/video3.mp4`,
    `${process.env.PUBLIC_URL}/model/video4.mp4`,
  ];

  // start with an initial random order
  const [videoQueue, setVideoQueue] = useState(shuffleArray(videoPaths));
  const [currentVideo, setCurrentVideo] = useState(0);
  const [nextVideo, setNextVideo] = useState(1);
  const [fade, setFade] = useState(false);
  const videoRef = useRef(null);
  const preloadRef = useRef(null);

  const FADE_OFFSET = 1200; // start fade ~1.2s before end

  // Fisher–Yates shuffle
  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Begin fade slightly before video ends
      if (
        video.duration &&
        video.currentTime >= video.duration - FADE_OFFSET / 1000 &&
        !fade
      ) {
        setFade(true);
      }
    };

    const handleEnded = () => {
      // Determine next video index
      const newNext = nextVideo + 1 >= videoQueue.length ? 0 : nextVideo + 1;

      // If we’ve reached the end of the queue, reshuffle for a new random cycle
      if (newNext === 0) {
        const reshuffled = shuffleArray(videoPaths);
        setVideoQueue(reshuffled);
      }

      // Advance playback
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
  }, [fade, nextVideo, videoQueue, videoPaths]);

  // Preload the next video silently
  useEffect(() => {
    const preloadVideo = preloadRef.current;
    if (preloadVideo) {
      preloadVideo.src = videoQueue[nextVideo];
      preloadVideo.load();
    }
  }, [nextVideo, videoQueue]);

  return (
    <div className="modelling-bg-container">
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

      {/* Hidden preloader */}
      <video ref={preloadRef} style={{ display: "none" }} preload="auto" />

      <button className="back-button" onClick={onBack}>
        ← Back to Home
      </button>
    </div>
  );
};

export default Modelling;
