import React, { useRef, useEffect, useState } from "react";

export default function PlayerBar({
  currentSong,
  isPlaying,
  togglePlay,
  skipTrack,
  volume,
  handleVolume,
}) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // NEW: Mute state

  // Auto-play and pause logic
  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play interrupted", err));
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  // NEW: Actually apply the volume to the audio element!
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100 || 0);
  };

  const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTo;
    setProgress(e.target.value);
  };

  return (
    <div className="absolute bottom-0 w-full bg-neutral-900/90 backdrop-blur-xl border-t border-white/10 flex flex-col z-50">
      <div className="w-full h-1 bg-neutral-800 relative group cursor-pointer">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="h-full bg-green-500 group-hover:bg-green-400 transition-colors"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="h-24 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4 w-1/3">
          <div className="relative w-14 h-14 group">
            <img
              src={currentSong.cover}
              alt="cover"
              className="w-full h-full rounded-md object-cover shadow-lg"
            />
          </div>
          <div>
            <h4 className="font-bold text-white tracking-wide truncate max-w-[200px]">
              {currentSong.title}
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5 truncate max-w-[200px]">
              {currentSong.artist}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => skipTrack("prev")}
              className="text-neutral-400 hover:text-white text-xl transition-colors"
            >
              ⏮
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-all shadow-lg"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              onClick={() => skipTrack("next")}
              className="text-neutral-400 hover:text-white text-xl transition-colors"
            >
              ⏭
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-2 text-[10px] text-neutral-400 font-medium tracking-wider">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* UPDATED: Volume Control with functional mute button */}
        <div className="flex items-center justify-end w-1/3 space-x-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            className="w-24 accent-green-500 cursor-pointer"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => skipTrack("next")}
      />
    </div>
  );
}
