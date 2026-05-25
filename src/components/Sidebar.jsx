import React from "react";

export default function Sidebar({
  currentView,
  setCurrentView,
  setActiveCategory,
}) {
  // NEW: Helper function to handle playlist clicks
  const handlePlaylistClick = (category) => {
    setCurrentView("home");
    setActiveCategory(category);
  };

  return (
    <aside className="w-64 bg-black p-6 hidden md:block flex-shrink-0 z-50">
      <h1 className="text-3xl font-bold text-green-500 mb-10 tracking-tight">
        ArchMusic
      </h1>

      <nav className="space-y-6 text-neutral-400 font-semibold">
        <button
          onClick={() => {
            setCurrentView("home");
            setActiveCategory("All");
          }}
          className={`block w-full text-left transition ${currentView === "home" ? "text-white" : "hover:text-white"}`}
        >
          🏠 Home
        </button>
        <button
          onClick={() => {
            setCurrentView("home");
            document.querySelector('input[type="text"]').focus();
          }}
          className="block w-full text-left hover:text-white transition"
        >
          🔍 Search
        </button>
        <button
          onClick={() => setCurrentView("playlist")}
          className={`block w-full text-left transition ${currentView === "playlist" ? "text-white" : "hover:text-white"}`}
        >
          📚 Your Library
        </button>
      </nav>

      <div className="mt-12 border-t border-neutral-800 pt-6">
        <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-4">
          Playlists
        </p>
        <div className="space-y-4 text-neutral-400 text-sm font-medium">
          <p
            onClick={() => setCurrentView("playlist")}
            className={`cursor-pointer transition-colors hover:text-white ${currentView === "playlist" ? "text-green-400" : ""}`}
          >
            Liked Songs ♥
          </p>

          {/* UPDATED: These links now actually filter the music! */}
          <p
            onClick={() => handlePlaylistClick("Electronic")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            Coding Beats 💻
          </p>
          <p
            onClick={() => handlePlaylistClick("Lofi")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            Chill Vibes 🌙
          </p>
          <p
            onClick={() => handlePlaylistClick("Acoustic")}
            className="cursor-pointer hover:text-white transition-colors"
          >
            Acoustic Sunrise 🌅
          </p>
        </div>
      </div>
    </aside>
  );
}
