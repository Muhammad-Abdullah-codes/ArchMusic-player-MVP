# 🎵 ArchMusic Player

**ArchMusic** is a modern, web-based music player built as part of the Web Development Internship at **Arch Technologies**. It features a sleek, dark-mode user interface, real-time audio manipulation, and dynamic playlist functionality without relying on an external backend.

---

## ✨ Features

- **Full Audio Controls:** Play, pause, skip (forward/backward), volume slider, mute toggle, and a draggable progress scrubber.
- **Library & Playlists:** Users can "Like" (♥) songs to instantly add them to a dedicated "Your Library" view.
- **Smart Discovery:** Real-time search functionality by song title or artist.
- **Genre Filtering:** Dynamic category pills (Lofi, Electronic, Acoustic, Hip-Hop) and sidebar quick-links.
- **Premium UI/UX:** Built with Tailwind CSS featuring glassmorphism (backdrop-blur), active-state visual feedback, and a fully responsive layout.
- **Zero-Dependency Audio:** Utilizes the native HTML5 `<audio>` API deeply integrated with React's `useRef` and `useEffect` hooks for seamless playback.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite (for rapid HMR and optimized builds)
- **Styling:** Tailwind CSS
- **Data Management:** Local React State (`useState`) & Mock Data Arrays
- **Media Handling:** HTML5 Audio API

---

## 📂 Project Architecture

```text
arch-music-player/
├── public/
├── src/
│   ├── components/
│   │   ├── PlayerBar.jsx   # Sticky bottom control bar
│   │   ├── Sidebar.jsx     # Navigation and playlist links
│   │   └── TrackList.jsx   # Main grid for discovery and library
│   ├── data/
│   │   └── songs.js        # Local database of 12 royalty-free tracks
│   ├── App.jsx             # Main layout and global state management
│   ├── index.css           # Global Tailwind directives
│   └── main.jsx            # React DOM entry point
├── tailwind.config.js
└── package.json
```
