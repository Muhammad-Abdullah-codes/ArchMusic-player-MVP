import React from "react";

export default function TrackList({
  songs,
  currentSong,
  setCurrentSong,
  setIsPlaying,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  likedSongs,
  setLikedSongs,
  currentView,
}) {
  const categories = ["All", "Lofi", "Electronic", "Acoustic", "Hip-Hop"];

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const toggleLike = (e, songId) => {
    e.stopPropagation();
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  // 1. Advanced Filter Logic: Combine View, Search, and Category
  const filteredSongs = songs.filter((song) => {
    // If in Library view, exclude songs that aren't liked
    if (currentView === "playlist" && !likedSongs.includes(song.id)) {
      return false;
    }

    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || song.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-1 bg-gradient-to-b from-neutral-800 to-neutral-900 overflow-y-auto pb-32 relative">
      <div className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md p-8 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {currentView === "playlist" ? "Your Library" : "Discover"}
          </h2>

          <div className="relative w-full md:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-800 text-white rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* Hide Categories if looking at the Playlist to avoid empty states */}
        {currentView === "home" && (
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${
                    activeCategory === category
                      ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => {
            const isActive = currentSong.id === song.id;
            const isLiked = likedSongs.includes(song.id);

            return (
              <div
                key={song.id}
                onClick={() => handlePlaySong(song)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 shadow-lg flex items-center justify-between group border border-transparent 
                  ${isActive ? "bg-neutral-800/80 border-green-500/50" : "bg-neutral-800/30 hover:bg-neutral-700/50"}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={song.cover}
                      alt="cover"
                      className="w-16 h-16 rounded-md object-cover shadow-md"
                    />
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity rounded-md ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    >
                      <span
                        className={
                          isActive
                            ? "text-green-500 animate-pulse"
                            : "text-white"
                        }
                      >
                        {isActive ? "🔊" : "▶"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`font-bold text-lg transition-colors ${isActive ? "text-green-400" : "text-white"}`}
                    >
                      {song.title}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {song.artist} • {song.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => toggleLike(e, song.id)}
                  className={`text-xl transition-transform hover:scale-110 ${isLiked ? "text-green-500" : "text-neutral-500 hover:text-white"}`}
                >
                  {isLiked ? "♥" : "♡"}
                </button>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-neutral-500">
            <span className="text-4xl mb-4">🎶</span>
            <p className="text-xl">
              {currentView === "playlist" && likedSongs.length === 0
                ? "Your library is empty. Go 'like' some songs!"
                : `No tracks found for "${searchQuery}"`}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
