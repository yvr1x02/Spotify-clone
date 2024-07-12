import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shuffleIcon from "../assets/playerbuttons/shuffle.png";
import prevIcon from "../assets/playerbuttons/prev.png";
import playIcon from "../assets/playerbuttons/play.png";
import pauseIcon from "../assets/playerbuttons/pause.png";
import nextIcon from "../assets/playerbuttons/next.png";
import repeatIcon from "../assets/playerbuttons/repeat.png";
import { toggleLikeTrack } from "../store/playerSlice";

const Player = () => {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const likedTracks = useSelector((state) => state.player.likedTracks);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentTrack) {
      console.log("Setting new track", currentTrack.preview);
      audioRef.current.src = currentTrack.preview;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      console.log("Current time updated:", audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log("Duration set:", audio.duration);
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

  const handlePlayPauseClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
      console.log("Playing audio");
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("Pausing audio");
    }
  };

  const handleLikeClick = () => {
    if (currentTrack) {
      dispatch(toggleLikeTrack(currentTrack));
      console.log("Toggled like for track:", currentTrack);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const newTime = (e.clientX / progressBar.clientWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    console.log("Progress clicked, new time:", newTime);
  };

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed-bottom bg-container pt-3">
      <div className="container d-flex align-items-center">
        {currentTrack && (
          <div className="d-flex align-items-center me-3">
            <img
              src={currentTrack.album.cover_medium}
              alt="Album Cover"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div className="track-info">
              <h6 className="mb-0">{currentTrack.title}</h6>
              <p className="mb-0">{currentTrack.artist.name}</p>
            </div>
            <span
              onClick={handleLikeClick}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color: likedTracks[currentTrack.id] ? "green" : "gray",
                fontSize: "20px",
              }}
            >
              <i className={`bi bi-heart${likedTracks[currentTrack.id] ? "-fill" : ""}`}></i>
            </span>
          </div>
        )}
        <div className="flex-grow-1 text-center">
          <div className="d-flex justify-content-center">
            <button className="btn playerControls">
              <img src={shuffleIcon} alt="shuffle" style={{ width: "12px", height: "12px" }} />
            </button>
            <button className="btn playerControls">
              <img src={prevIcon} alt="prev" style={{ width: "12px", height: "12px" }} />
            </button>
            <button className="btn playerControls" onClick={handlePlayPauseClick}>
              <img src={isPlaying ? pauseIcon : playIcon} alt="play/pause" style={{ width: "15px", height: "15px" }} />
            </button>
            <button className="btn playerControls">
              <img src={nextIcon} alt="next" style={{ width: "12px", height: "12px" }} />
            </button>
            <button className="btn playerControls">
              <img src={repeatIcon} alt="repeat" style={{ width: "12px", height: "12px" }} />
            </button>
          </div>
          <div className="progress mt-3" onClick={handleProgressClick} style={{ cursor: "pointer" }}>
            <div
              role="progressbar"
              style={{ width: `${(currentTime / duration) * 100}%` }}
              aria-valuenow={currentTime}
              aria-valuemin="0"
              aria-valuemax={duration}
            ></div>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <span>{formattedTime(currentTime)}</span>
            <span>{formattedTime(duration)}</span>
          </div>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
