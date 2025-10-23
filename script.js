// =======================
// Data
// =======================
const videos = [
  { title: "AI Chatbot Python Full Course For Beginners (Learn How To Code in 2025)", views: "Never mind learn", thumbnail: "https://picsum.photos/300/150?1", url: "https://www.youtube.com/watch?v=Lc5LKDqhyzs" },
  { title: "AWS Full Course 2025 | AWS Training For Beginners", views: "980K views", thumbnail: "https://picsum.photos/300/150?2", url: "https://youtu.be/ThKukf8i35U" },
  { title: "R Programming Full Course", views: "760K views", thumbnail: "https://picsum.photos/300/150?3", url: "https://youtu.be/P15wMPd8CWo" }
];

const playlists = [
  { title: "Data Structures", views: "540K views", thumbnail: "https://picsum.photos/300/150?4", url: "https://youtube.com/playlist?list=PLYwpaL_SFmcBpa1jwpCbEDespCRF3UPE5" },
  { title: "Algorithms", views: "540K views", thumbnail: "https://picsum.photos/300/150?5", url: "https://youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O" },
  { title: "Java Certification 8 & 11 OCJA", views: "760K views", thumbnail: "https://picsum.photos/300/150?6", url: "https://youtube.com/playlist?list=PLd3UqWTnYXOnujVvl3wiZfrFKUEg9jBeA" }
];

// =======================
// Helpers - render grids
// =======================
function createCard(item) {
  const card = document.createElement('div');
  card.className = 'video';
  card.innerHTML = `
    <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}">
    <div class="video-info">
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.views)}</p>
    </div>
  `;
  return card;
}

function loadGrid(items, containerId) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = '';
  items.forEach(it => {
    const card = createCard(it);
    // clicking opens modal and plays either video or playlist
    card.addEventListener('click', () => openModal(it.url));
    grid.appendChild(card);
  });
}

// escape helper simple
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// load initial content
loadGrid(videos, 'videoGrid');
loadGrid(playlists, 'playlistGrid');

// =======================
// Modal player
// =======================
const modal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');

function openModal(url) {
  // build embeddable URL
  // playlist -> embed/videoseries?list=PLAYLIST_ID
  // watch?v=VIDEO_ID -> embed/VIDEO_ID
  // youtu.be/VIDEO_ID -> www.youtube.com/embed/VIDEO_ID
  let embedUrl = url
    .replace('watch?v=', 'embed/')
    .replace('youtu.be/', 'www.youtube.com/embed/')
    // convert playlist to videoseries embed:
    .replace('youtube.com/playlist?list=', 'www.youtube.com/embed/videoseries?list=')
    .replace('youtube.com/watch?v=', 'www.youtube.com/embed/');

  // ensure if query existed we don't duplicate '?'
  const suffix = embedUrl.includes('?') ? '&rel=0&autoplay=1&modestbranding=1&controls=1' : '?rel=0&autoplay=1&modestbranding=1&controls=1';
  videoPlayer.src = embedUrl + suffix;

  modal.style.display = 'flex';
}

// close modal
function closeModal() {
  modal.style.display = 'none';
  videoPlayer.src = '';
}

// allow clicking outside content to close
function modalBackgroundClick(e) {
  if (e.target === modal) closeModal();
}

// =======================
// Tabs
// =======================
function showTab(tabId, event) {
  // prevent default anchor behavior
  if (event && event.preventDefault) event.preventDefault();

  // hide all tab contents
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  // show requested
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');

  // active link styling
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
}

// =======================
// Search (searches active tab)
// =======================
function searchInActiveTab() {
  const q = (document.getElementById('searchInput').value || '').trim().toLowerCase();
  const activeTab = document.querySelector('.tab-content.active');
  if (!activeTab) return;

  if (activeTab.id === 'videosTab') {
    const filtered = videos.filter(v => v.title.toLowerCase().includes(q));
    loadGrid(filtered, 'videoGrid');
  } else if (activeTab.id === 'playlistsTab') {
    const filtered = playlists.filter(p => p.title.toLowerCase().includes(q));
    loadGrid(filtered, 'playlistGrid');
  }
}

// close modal on Escape
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
