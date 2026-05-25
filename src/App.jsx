import React, { useState } from "react";
import { songs } from "./data/songs";
import Sidebar from "./components/Sidebar";
import TrackList from "./components/TrackList";
import PlayerBar from "./components/PlayerBar";

function App() {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedSongs, setLikedSongs] = useState([]);

  // NEW: Navigation State to switch between Home and Playlist
  const [currentView, setCurrentView] = useState("home");

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleVolume = (e) => setVolume(parseFloat(e.target.value));

  const skipTrack = (direction) => {
    let index = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "next") {
      index = (index + 1) % songs.length;
    } else if (direction === "prev") {
      index = (index - 1 + songs.length) % songs.length;
    }
    setCurrentSong(songs[index]);
    setIsPlaying(true);
  };

  return (
    <div className="flex h-screen bg-neutral-900 font-sans overflow-hidden">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        setActiveCategory={setActiveCategory}
      />

      <TrackList
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        likedSongs={likedSongs}
        setLikedSongs={setLikedSongs}
        currentView={currentView}
      />

      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        skipTrack={skipTrack}
        volume={volume}
        handleVolume={handleVolume}
      />
    </div>
  );
}

export default App;
