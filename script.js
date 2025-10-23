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
    title: "AWS Full Course 2025 | AWS Training For Beginners ", 
    views: "980K Never mind learn", 
    thumbnail: "https://picsum.photos/300/150?2", 
    url: "https://www.youtube.com/live/6_R1ZUVz7FU?si=m-Qp_lvGKZ-8j3ml" 
  },
  { 
    title: "AWS p1", 
    views: "850K views", 
    thumbnail: "https://picsum.photos/300/150?3", 
    url: "https://youtu.be/ThKukf8i35U?si=2X1StlTAudztpGXX" 
  },
  { 
    title: "R prog", 
    views: "760K views", 
    thumbnail: "https://picsum.photos/300/150?4", 
    url: "https://youtu.be/P15wMPd8CWo?si=OmgWylhyX6FqzpNy" 
  },
  { 
    title: "DS", 
    views: "540K views", 
    thumbnail: "https://picsum.photos/300/150?5", 
    url: "https://youtube.com/playlist?list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu&si=vCWfgaIoJiRhQqp8" 
  },
    { 
    title: "Algorithms", 
    views: "540K views", 
    thumbnail: "https://picsum.photos/300/150?5", 
    url: "https://youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O&si=3V7fKD7h6edTrlwi" 
  },
    { 
    title: "Java Certification 8 & 11 OCJA", 
    views: "760K views", 
    thumbnail: "https://picsum.photos/300/150?4", 
    url: "https://youtube.com/playlist?list=PLd3UqWTnYXOnujVvl3wiZfrFKUEg9jBeA&si=_6wsUKs3qr5lQ6jI" 
  },
 { 
    title: "DS", 
    views: "540K views", 
    thumbnail: "https://picsum.photos/300/150?5", 
    url: "https://youtube.com/playlist?list=PLYwpaL_SFmcBpa1jwpCbEDespCRF3UPE5&si=QNk-TgjPInN-goHy" 
  },
];

// =======================
// 🎥 GENERATE VIDEO GRID
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
    // When clicked, open modal and play only that video
    videoCard.addEventListener("click", () => openModal(v.url));
    videoGrid.appendChild(videoCard);
  });
}

loadVideos(videos);

// =======================
// 🧭 TAB SWITCHING
// =======================
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

// =======================
// 🎬 VIDEO PLAYER MODAL
// =======================
const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");

// Open modal and play only the chosen video (no random suggestions)
function openModal(videoUrl) {
  modal.style.display = "flex";
  videoPlayer.src = `${videoUrl}?autoplay=1&rel=0&modestbranding=1&controls=1`;
}

// Close modal and stop playback
function closeModal() {
  modal.style.display = "none";
  videoPlayer.src = ""; // Stop video when closed
}

// Close modal when clicking outside it
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
function openModal(videoUrl) {
  modal.style.display = "flex";
  videoPlayer.src = `${videoUrl}?autoplay=1&rel=0&modestbranding=1&controls=1`;

  // fallback: redirect if video fails
  videoPlayer.onerror = () => {
    alert("This video cannot be embedded. Opening on YouTube instead...");
    window.open(videoUrl.replace("embed/", "watch?v="), "_blank");
  };
}
