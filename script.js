// =======================
// 📹 VIDEO & PLAYLIST DATA
// =======================

// 🎞 Single Videos
const videos = [
  { 
    title: "AI Chatbot Python Full Course For Beginners (Learn How To Code in 2025)", 
    views: "Never mind learn", 
    thumbnail: "https://picsum.photos/300/150?1", 
    url: "https://www.youtube.com/watch?v=Lc5LKDqhyzs" 
  },
  { 
    title: "AWS Full Course 2025 | AWS Training For Beginners", 
    views: "980K views", 
    thumbnail: "https://picsum.photos/300/150?2", 
    url: "https://youtu.be/ThKukf8i35U" 
  },
  { 
    title: "R Programming Full Course", 
    views: "760K views", 
    thumbnail: "https://picsum.photos/300/150?3", 
    url: "https://youtu.be/P15wMPd8CWo" 
  },
  // 🆕 BEL Exam Preparation Videos
  { 
    title: "BEL Exam Preparation 2025 - Aptitude Session 1", 
    views: "New", 
    thumbnail: "https://picsum.photos/300/150?7", 
    url: "https://www.youtube.com/watch?v=2bXZRKb-Wkw" 
  },
  { 
    title: "BEL Exam Preparation 2025 - Session 2", 
    views: "New", 
    thumbnail: "https://picsum.photos/300/150?8", 
    url: "https://www.youtube.com/watch?v=QARxvJ3rM8s" 
  },
  { 
    title: "BEL Exam Preparation 2025 - Technical Concepts", 
    views: "New", 
    thumbnail: "https://picsum.photos/300/150?9", 
    url: "https://www.youtube.com/watch?v=4vP6Fl8pJo4" 
  }
];

// 📂 Playlists
const playlists = [
  { 
    title: "Data Structures", 
    views: "540K views", 
    thumbnail: "https://picsum.photos/300/150?4", 
    url: "https://www.youtube.com/playlist?list=PLYwpaL_SFmcBpa1jwpCbEDespCRF3UPE5" 
  },
  { 
    title: "Algorithms", 
    views: "540K views", 
    thumbnail: "https://picsum.photos/300/150?5", 
    url: "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O" 
  },
  { 
    title: "Java Certification 8 & 11 OCJA", 
    views: "760K views", 
    thumbnail: "https://picsum.photos/300/150?6", 
    url: "https://www.youtube.com/playlist?list=PLd3UqWTnYXOnujVvl3wiZfrFKUEg9jBeA" 
  }
];

// =======================
// 🎥 GRID RENDERING
// =======================
function createCard(item) {
  const div = document.createElement("div");
  div.className = "video";
  div.innerHTML = `
    <img src="${item.thumbnail}" alt="${item.title}">
    <div class="video-info">
      <h4>${item.title}</h4>
      <p>${item.views}</p>
    </div>
  `;
  div.onclick = () => openModal(item.url);
  return div;
}

function loadGrid(items, containerId) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = "";
  items.forEach(item => grid.appendChild(createCard(item)));
}

// Initial load
loadGrid(videos, "videoGrid");
loadGrid(playlists, "playlistGrid");

// =======================
// 🎬 VIDEO MODAL PLAYER
// =======================
const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");

function openModal(url) {
  let embed = "";

  // 🧠 Identify and convert correctly
  if (url.includes("playlist?list=")) {
    // Playlist URL
    const listId = url.split("list=")[1];
    embed = `https://www.youtube.com/embed/videoseries?list=${listId}`;
  } else if (url.includes("watch?v=")) {
    // Normal YouTube video
    const videoId = url.split("v=")[1].split("&")[0];
    embed = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("youtu.be/")) {
    // Short YouTube link
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    embed = `https://www.youtube.com/embed/${videoId}`;
  }

  // ✅ Set iframe src
  videoPlayer.src = `${embed}?rel=0&autoplay=1&modestbranding=1`;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  videoPlayer.src = "";
}

function modalBackgroundClick(e) {
  if (e.target === modal) closeModal();
}

// =======================
// 🧭 TAB SWITCHING
// =======================
function showTab(tabId, btn) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document.querySelectorAll(".nav-links button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// =======================
// 🔍 SEARCH FUNCTION
// =======================
function searchInActiveTab() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const active = document.querySelector(".tab-content.active");

  if (active.id === "videosTab") {
    const filtered = videos.filter(v => v.title.toLowerCase().includes(q));
    loadGrid(filtered, "videoGrid");
  } else if (active.id === "playlistsTab") {
    const filtered = playlists.filter(p => p.title.toLowerCase().includes(q));
    loadGrid(filtered, "playlistGrid");
  }
}

// Close modal on Escape
window.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
