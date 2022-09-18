import { createContext, useState } from "react";

export const VideoContext = createContext({});

export function VideoProvider({ children }) {
  const [video, setVideo] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  function setVideoFile(ref) {
    setVideo(ref);

    ref.addEventListener('pause', () => {
      setIsPaused(true);
    });

    ref.addEventListener('play', () => {
      setIsPaused(false);
    });
  }

  function playVideo() {
    video.play();
    setIsPaused(false);
  }

  function pauseVideo() {
    video.pause();
    setIsPaused(true);
  }

  function getVideoTime() {
    let time = video.currentTime;
    // format time like 00:00
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `[${minutes}:${seconds}]`;
  }

  return (
    <VideoContext.Provider
      value={{
        isPaused,
        setVideoFile,
        playVideo,
        pauseVideo,
        getVideoTime,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}