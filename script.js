// =======================
// 📹 VIDEO DATA
// =======================
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
  { 
    title: "Data Structures", 
    views: "540K views", 
    thumbnail: "https://picsum.photos/300/150?4", 
    url: "https://youtube.com/playlist?list=PLYwpaL_SFmcBpa1jwpCbEDespCRF3UPE5" 
  },
  { 
    title: "Algorithms", 
    views: "540K views", 
    thumbnail: "https://picsum.photos/300/150?5", 
    url: "https://youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O" 
  },
  { 
    title: "Java Certification 8 & 11 OCJA", 
    views: "760K views", 
    thumbnail: "https://picsum.photos/300/150?6", 
    url: "https://youtube.com/playlist?list=PLd3UqWTnYXOnujVvl3wiZfrFKUEg9jBeA" 
  }
];

// =======================
// 🎥 VIDEO GRID
// =======================
const videoGrid = document.getElementById("videoGrid");

function loadVideos(videosToLoad) {
  videoGrid.innerHTML = "";
  videosToLoad.forEach(v => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video");
    videoCard.innerHTML = `
      <img src="${v.thumbnail}" alt="Thumbnail">
      <div class="video-info">
        <h4>${v.title}</h4>
        <p>${v.views}</p>
      </div>
    `;
    videoCard.addEventListener("click", () => openModal(v.url));
    videoGrid.appendChild(videoCard);
  });
}

loadVideos(videos);

// =======================
// 🎬 VIDEO PLAYER MODAL
// =======================
const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");

function openModal(videoUrl) {
  modal.style.display = "flex";

  let embedUrl = videoUrl
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "www.youtube.com/embed/")
    .replace("youtube.com/playlist?", "www.youtube.com/embed/videoseries?");

  videoPlayer.src = `${embedUrl}?autoplay=1&rel=0&modestbranding=1&controls=1`;
}

function closeModal() {
  modal.style.display = "none";
  videoPlayer.src = "";
}

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

// =======================
// 🔍 SEARCH FUNCTIONALITY
// =======================
function searchVideos() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = videos.filter(v => v.title.toLowerCase().includes(query));
  loadVideos(filtered);
}
