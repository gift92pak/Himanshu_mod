
// Demo script for Himanshu_mods
const games = [
  {id:'g1',title:'Neon Speed — Demo',version:'2.1',size:'58 MB',category:'Racing',thumb:'assets/game1.jpg',downloads:12345},
  {id:'g2',title:'Shadow Strike — Practice',version:'1.6',size:'72 MB',category:'Shooting',thumb:'assets/game2.jpg',downloads:8745},
  {id:'g3',title:'Puzzle Cube — Indie',version:'3.0',size:'27 MB',category:'Puzzle',thumb:'assets/game3.jpg',downloads:4260},
];

function formatNumber(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); }

function renderGames(list){
  const grid = document.getElementById('gamesGrid');
  if(!grid) return;
  grid.innerHTML = '';
  list.forEach(g=>{
    const div = document.createElement('div');
    div.className = 'game-card';
    div.innerHTML = `
      <img src="${g.thumb}" alt="${g.title}" class="game-thumb"/>
      <div class="game-title">${g.title}</div>
      <div class="game-meta"><span>${g.category}</span><span>v${g.version} • ${g.size}</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
        <div class="muted">Downloads: ${formatNumber(g.downloads)}</div>
        <div style="display:flex;gap:8px">
          <a class="btn btn-cta" href="details.html?id=${g.id}">Details</a>
          <a class="btn" href="#" onclick="fakeDownload(event,'${g.id}')">Download</a>
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
}

function fakeDownload(e,id){
  e.preventDefault();
  alert('Demo download started (placeholder). Use only legal content.');
  const g = games.find(x=>x.id===id);
  if(g) g.downloads += Math.floor(Math.random()*20+5);
  renderGames(games);
}

function loadDetails(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id) return;
  const g = games.find(x=>x.id===id);
  if(!g) return;
  document.getElementById('gameTitle').textContent = g.title;
  document.getElementById('gameVersion').textContent = g.version;
  document.getElementById('gameSize').textContent = g.size;
  document.getElementById('gameDesc').textContent = 'This is a demo description for a legal, permissioned mod or indie APK. Use this template for lawful content only.';
  document.getElementById('detailThumb').src = g.thumb;
  document.getElementById('downloadCount').textContent = 'Downloads: ' + formatNumber(g.downloads);
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderGames(games);
  loadDetails();
  const searchInput = document.getElementById('searchInput');
  if(searchInput){
    searchInput.addEventListener('input',(e)=>{
      const q = e.target.value.toLowerCase();
      renderGames(games.filter(x=> x.title.toLowerCase().includes(q) || x.category.toLowerCase().includes(q)));
    });
  }
});
