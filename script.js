/* ==========================================================
   PurpleScreen — script.js
   Vanilla JS. No build tools, no dependencies.
   Data below is clearly marked: real public-domain film facts
   for the "10 free to watch" titles, and explicitly-flagged
   DEMO placeholder data for the rest of the catalog.
   Kurdish subtitle status is never marked "ready" unless it
   has actually been verified — see note on each item.
   ========================================================== */

(function(){
"use strict";

/* ---------------------------------------------------------
   1. CATALOG DATA
   --------------------------------------------------------- */

// Real public-domain feature films. Facts (year/director/runtime/
// genre) are accurate historical record. IMDb scores are the
// long-standing public consensus figures, shown as approximate.
// "watchUrl" points to an Internet Archive search for the title —
// a legitimate public-domain source — never a fabricated stream.
// Kurdish subtitle status is honestly reported: not yet verified.
const FREE_MOVIES = [
  {id:"free-1", title:"Night of the Living Dead", originalTitle:"Night of the Living Dead", type:"movie",
   year:1968, genres:["Horror","Thriller"], runtime:96, imdb:7.8, director:"George A. Romero",
   country:"ئەمریکا", language:"ئینگلیزی", cast:["Duane Jones","Judith O'Dea","Karl Hardman"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"progress",
   description:"کۆمەڵێک کەس لە ماڵێکی گوندنشین خۆیان دەشارنەوە لە هێرشی مردووە زیندووبووەکان لە شەوێکی تۆقێنەردا. یەکێکە لە بناغەدانەرانی ژانەری هۆڕەری هاوچەرخ و ماڵی گشتییە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=Night+of+the+Living+Dead+1968"},

  {id:"free-2", title:"Nosferatu", originalTitle:"Nosferatu, eine Symphonie des Grauens", type:"movie",
   year:1922, genres:["Horror","Fantasy"], runtime:94, imdb:7.9, director:"F. W. Murnau",
   country:"ئەڵمانیا", language:"بێدەنگ", cast:["Max Schreck","Gustav von Wangenheim","Greta Schröder"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"progress",
   description:"یەکەم فیلمی سینەمایی سەبارەت بە ئەفسانەی دراکولا، بە شێوەیەکی نائاشکرا و ترسناک، فیلمێکی بێدەنگی ئەڵمانی و لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=Nosferatu+1922"},

  {id:"free-3", title:"Metropolis", originalTitle:"Metropolis", type:"movie",
   year:1927, genres:["Sci-Fi","Drama"], runtime:148, imdb:8.3, director:"Fritz Lang",
   country:"ئەڵمانیا", language:"بێدەنگ", cast:["Brigitte Helm","Gustav Fröhlich","Alfred Abel"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"progress",
   description:"شارێکی داهاتوویی دابەشکراو بۆ دەسەڵاتدار و کرێکار، یەکێک لە کاریگەرترین فیلمە زانستی-خەیاڵییەکانی مێژووی سینەما و لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=Metropolis+1927"},

  {id:"free-4", title:"The Cabinet of Dr. Caligari", originalTitle:"Das Cabinet des Dr. Caligari", type:"movie",
   year:1920, genres:["Horror","Mystery"], runtime:76, imdb:8.0, director:"Robert Wiene",
   country:"ئەڵمانیا", language:"بێدەنگ", cast:["Werner Krauss","Conrad Veidt","Lil Dagover"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"none",
   description:"فیلمێکی بێدەنگی ئەکسپرێسیۆنیستی ئەڵمانی سەبارەت بە دکتۆرێکی نهێنی و کەسێکی هیپنۆتیزمکراو. لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=The+Cabinet+of+Dr+Caligari+1920"},

  {id:"free-5", title:"A Trip to the Moon", originalTitle:"Le Voyage dans la Lune", type:"movie",
   year:1902, genres:["Sci-Fi","Adventure"], runtime:13, imdb:8.2, director:"Georges Méliès",
   country:"فەرەنسا", language:"بێدەنگ", cast:["Georges Méliès","Victor André"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"none",
   description:"کورتەفیلمێکی مێژوویی و یەکێک لە یەکەم فیلمە زانستی-خەیاڵییەکانی جیهان، لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=A+Trip+to+the+Moon+1902"},

  {id:"free-6", title:"The Great Train Robbery", originalTitle:"The Great Train Robbery", type:"movie",
   year:1903, genres:["Action","Crime"], runtime:12, imdb:6.6, director:"Edwin S. Porter",
   country:"ئەمریکا", language:"بێدەنگ", cast:["Broncho Billy Anderson","Justus D. Barnes"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"none",
   description:"یەکێک لە سەرەتاکانی فیلمی ڕەوایەتی و ژانەری وێستەرن، لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=The+Great+Train+Robbery+1903"},

  {id:"free-7", title:"Plan 9 from Outer Space", originalTitle:"Plan 9 from Outer Space", type:"movie",
   year:1957, genres:["Sci-Fi","Horror"], runtime:79, imdb:4.0, director:"Ed Wood",
   country:"ئەمریکا", language:"ئینگلیزی", cast:["Bela Lugosi","Vampira","Tor Johnson"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"progress",
   description:"فیلمێکی زانستی-خەیاڵی کالت کە زۆرجار وەک یەکێک لە خۆشترین فیلمە خراپەکانی مێژوو ناسراوە. لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=Plan+9+from+Outer+Space+1957"},

  {id:"free-8", title:"The Phantom of the Opera", originalTitle:"The Phantom of the Opera", type:"movie",
   year:1925, genres:["Horror","Drama"], runtime:93, imdb:7.4, director:"Rupert Julian",
   country:"ئەمریکا", language:"بێدەنگ", cast:["Lon Chaney","Mary Philbin","Norman Kerry"],
   poster:"", backdrop:"", romance:true, subtitleStatus:"none",
   description:"وەشانی کلاسیکی بێدەنگی ڕۆمانی گاستۆن لەرۆکس، بە یارییەکی نەمری لۆن چەینی. لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=The+Phantom+of+the+Opera+1925"},

  {id:"free-9", title:"Detour", originalTitle:"Detour", type:"movie",
   year:1945, genres:["Crime","Drama"], runtime:68, imdb:7.3, director:"Edgar G. Ulmer",
   country:"ئەمریکا", language:"ئینگلیزی", cast:["Tom Neal","Ann Savage"],
   poster:"", backdrop:"", romance:true, subtitleStatus:"progress",
   description:"یەکێک لە ناودارترین فیلم نوارەکان بە بودجەیەکی کەم، سەبارەت بە پیاوێک کە بەختی خراپی تووش دەبێت. لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=Detour+1945+film"},

  {id:"free-10", title:"D.O.A.", originalTitle:"D.O.A.", type:"movie",
   year:1950, genres:["Crime","Mystery"], runtime:83, imdb:7.5, director:"Rudolph Maté",
   country:"ئەمریکا", language:"ئینگلیزی", cast:["Edmond O'Brien","Pamela Britton"],
   poster:"", backdrop:"", romance:false, subtitleStatus:"none",
   description:"پیاوێک هەواڵ دەدرێتێ کە ژەهراوی کوشندەی خواردووە و تەنها چەند ڕۆژێکی ماوە، بۆیە دەست دەکات بە دۆزینەوەی بکوژەکەی خۆی. لە ناوچەی گشتیدایە (Public Domain).",
   free:true, watchUrl:"https://archive.org/search?query=D.O.A.+1950+film"},
];

// DEMO catalog additions — clearly fictional placeholder rows used
// only to demonstrate layout, filters and search. None of this is
// presented to the user as verified real-world data.
const DEMO_MOVIES = [
  {id:"demo-m1", title:"Wind Over the Valley", originalTitle:"Wind Over the Valley", type:"movie", demo:true,
   year:2024, genres:["Drama","Adventure"], runtime:118, imdb:null, director:"—",
   country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:false, subtitleStatus:"progress",
   description:"نموونەیەکی مۆکاپ (demo) بۆ نیشاندانی شێوازی لاپەڕەی فیلم؛ هێشتا کاتالۆگی ڕاستەقینە نەگیراوەتەوە.",
   free:false, watchUrl:null},
  {id:"demo-m2", title:"City of Glass Towers", originalTitle:"City of Glass Towers", type:"movie", demo:true,
   year:2025, genres:["Sci-Fi","Thriller"], runtime:104, imdb:null, director:"—",
   country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:false, subtitleStatus:"none",
   description:"نموونەیەکی مۆکاپ (demo) بۆ نیشاندانی شێوازی لاپەڕەی فیلم؛ هێشتا کاتالۆگی ڕاستەقینە نەگیراوەتەوە.",
   free:false, watchUrl:null},
  {id:"demo-m3", title:"Autumn Letters", originalTitle:"Autumn Letters", type:"movie", demo:true,
   year:2023, genres:["Romance","Drama"], runtime:97, imdb:null, director:"—",
   country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:true, subtitleStatus:"progress",
   description:"نموونەیەکی مۆکاپ (demo) بۆ نیشاندانی شێوازی لاپەڕەی فیلم؛ هێشتا کاتالۆگی ڕاستەقینە نەگیراوەتەوە.",
   free:false, watchUrl:null},
];

const DEMO_SERIES = [
  {id:"demo-s1", title:"Northern Lights", type:"series", demo:true, year:2024, genres:["Drama","Crime"],
   imdb:null, country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:false,
   subtitleStatus:"progress", seasonsCount:2, episodesCount:16,
   description:"نموونەیەکی مۆکاپ (demo) بۆ زنجیرە. کاتالۆگی ڕاستەقینە دواتر زیاد دەکرێت.",
   seasons:[
     {number:1, episodes:[
       {number:1, title:"Beginning", runtime:44, date:"2024", subtitleStatus:"progress"},
       {number:2, title:"The Signal", runtime:41, date:"2024", subtitleStatus:"progress"},
       {number:3, title:"Old Friends", runtime:45, date:"2024", subtitleStatus:"none"},
     ]},
     {number:2, episodes:[
       {number:1, title:"Return", runtime:46, date:"2025", subtitleStatus:"none"},
       {number:2, title:"Fracture", runtime:43, date:"2025", subtitleStatus:"none"},
     ]},
   ]},
  {id:"demo-s2", title:"The Long Border", type:"series", demo:true, year:2023, genres:["Action","Drama"],
   imdb:null, country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:false,
   subtitleStatus:"none", seasonsCount:1, episodesCount:8,
   description:"نموونەیەکی مۆکاپ (demo) بۆ زنجیرە. کاتالۆگی ڕاستەقینە دواتر زیاد دەکرێت.",
   seasons:[{number:1, episodes:[
     {number:1, title:"Crossing", runtime:50, date:"2023", subtitleStatus:"none"},
     {number:2, title:"Watchtower", runtime:47, date:"2023", subtitleStatus:"none"},
   ]}]},
  {id:"demo-s3", title:"Paper Moons", type:"series", demo:true, year:2025, genres:["Comedy","Romance"],
   imdb:null, country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:true,
   subtitleStatus:"progress", seasonsCount:1, episodesCount:10,
   description:"نموونەیەکی مۆکاپ (demo) بۆ زنجیرە. کاتالۆگی ڕاستەقینە دواتر زیاد دەکرێت.",
   seasons:[{number:1, episodes:[
     {number:1, title:"Meet Cute", runtime:28, date:"2025", subtitleStatus:"progress"},
   ]}]},
];

const DEMO_ANIME = [
  {id:"demo-a1", title:"Steel Horizon", type:"anime", demo:true, year:2022, genres:["Action","Sci-Fi"],
   imdb:null, country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:false,
   subtitleStatus:"progress", seasonsCount:1, episodesCount:24,
   description:"نموونەیەکی مۆکاپ (demo) بۆ ئەنیمێ. کاتالۆگی ڕاستەقینە دواتر زیاد دەکرێت.",
   seasons:[{number:1, episodes:[{number:1,title:"Awakening",runtime:24,date:"2022",subtitleStatus:"progress"}]}]},
  {id:"demo-a2", title:"Whispering Garden", type:"anime", demo:true, year:2021, genres:["Fantasy","Romance"],
   imdb:null, country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:true,
   subtitleStatus:"none", seasonsCount:1, episodesCount:12,
   description:"نموونەیەکی مۆکاپ (demo) بۆ ئەنیمێ. کاتالۆگی ڕاستەقینە دواتر زیاد دەکرێت.",
   seasons:[{number:1, episodes:[{number:1,title:"Bloom",runtime:23,date:"2021",subtitleStatus:"none"}]}]},
  {id:"demo-a3", title:"Silent Circuit", type:"anime", demo:true, year:2025, genres:["Mystery","Sci-Fi"],
   imdb:null, country:"—", language:"—", cast:[], poster:"", backdrop:"", romance:false,
   subtitleStatus:"progress", seasonsCount:1, episodesCount:13,
   description:"نموونەیەکی مۆکاپ (demo) بۆ ئەنیمێ. کاتالۆگی ڕاستەقینە دواتر زیاد دەکرێت.",
   seasons:[{number:1, episodes:[{number:1,title:"Static",runtime:22,date:"2025",subtitleStatus:"progress"}]}]},
];

const ALL_MOVIES = [...FREE_MOVIES, ...DEMO_MOVIES];
const ALL_SERIES = [...DEMO_SERIES];
const ALL_ANIME  = [...DEMO_ANIME];
const ALL_TITLES = [...ALL_MOVIES, ...ALL_SERIES, ...ALL_ANIME];

// Deterministic pseudo "views" for sort demos only — derived from id,
// not presented anywhere as a real analytics figure.
function demoViews(item){
  let h = 0; for(const c of item.id) h = (h*31 + c.charCodeAt(0)) % 99991;
  return 1200 + (h % 48000);
}

/* ---------------------------------------------------------
   2. STATE (localStorage)
   --------------------------------------------------------- */
const LS = {
  get(key, fallback){ try{ const v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? fallback : v; }catch(e){ return fallback; } },
  set(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){ /* storage unavailable */ } }
};

const state = {
  theme: LS.get("ps_theme", "light"),
  favorites: LS.get("ps_favorites", []),           // array of ids
  history: LS.get("ps_history", []),                // array of {id, at}
  continueWatching: LS.get("ps_continue", []),      // array of {id, pct, episode}
  requests: LS.get("ps_requests", []),              // array of request objects
  reviews: LS.get("ps_reviews", {}),                // {itemId: [review,...]}
  reviewLikes: LS.get("ps_review_likes", {}),       // {reviewKey: true}
  notifSeen: LS.get("ps_notif_seen", false),
  romanceFilterOff: false,
};

function saveState(){
  LS.set("ps_favorites", state.favorites);
  LS.set("ps_history", state.history);
  LS.set("ps_continue", state.continueWatching);
  LS.set("ps_requests", state.requests);
  LS.set("ps_reviews", state.reviews);
  LS.set("ps_review_likes", state.reviewLikes);
}

const NOTIFICATIONS = [
  {icon:"🎬", text:"فیلمی نوێ زیادکرا: Detour (1945)", time:"ئێستا"},
  {icon:"🇹🇯", text:"کارکردن لەسەر ژێرنووسی کوردی بۆ Metropolis دەستی پێکرد", time:"ڕۆژێک لەمەوبەر"},
  {icon:"⭐", text:"پێداچوونەوەکەت لایک وەرگرت", time:"٢ ڕۆژ لەمەوبەر"},
];

/* ---------------------------------------------------------
   3. HELPERS
   --------------------------------------------------------- */
function $(sel, root){ return (root||document).querySelector(sel); }
function $all(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }
function esc(str){ return String(str==null?"":str).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function findItem(id){ return ALL_TITLES.find(m=>m.id===id); }
function isFav(id){ return state.favorites.includes(id); }

function toast(msg){
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>{ el.hidden = true; }, 2400);
}

function subtitleBadge(status){
  if(status === "ready") return `<span class="badge-sub ready">✓ ژێرنووسی کوردی</span>`;
  if(status === "progress") return `<span class="badge-sub progress">⏳ لە ژێرنووسکردندایە</span>`;
  return `<span class="badge-sub none">— ژێرنووس بەردەست نییە</span>`;
}

function posterBlock(item){
  if(item.poster){
    return `<img src="${esc(item.poster)}" alt="پۆستەری ${esc(item.title)}" loading="lazy"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'poster-fallback',innerHTML:'${esc(initials(item.title))}'}))">`;
  }
  return `<div class="poster-fallback">${esc(initials(item.title))}</div>`;
}
function initials(title){
  return title.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
}

function debounce(fn, ms){
  let t; return function(...args){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), ms); };
}

function typeLabel(t){
  return t==="movie" ? "فیلم" : t==="series" ? "زنجیرە" : "ئەنیمێ";
}

/* ---------------------------------------------------------
   4. CARD RENDERING
   --------------------------------------------------------- */
function renderCard(item){
  const fav = isFav(item.id);
  const rating = item.imdb ? item.imdb.toFixed(1) : "—";
  const metaBits = [item.year];
  if(item.type === "movie" && item.runtime) metaBits.push(item.runtime+"خ");
  if(item.type !== "movie" && item.seasonsCount) metaBits.push(item.seasonsCount+" وەرز");
  if(item.genres && item.genres[0]) metaBits.push(item.genres[0]);

  return `
  <div class="card" data-open="${item.id}" tabindex="0" role="button" aria-label="${esc(item.title)}">
    <div class="card-poster">
      ${posterBlock(item)}
      ${subtitleBadge(item.subtitleStatus)}
      <button class="fav-btn ${fav?"active":""}" data-fav="${item.id}" aria-label="زیادکردن بۆ دڵخوازەکان" aria-pressed="${fav}">
        ${fav ? "♥" : "♡"}
      </button>
      <span class="card-rating">${item.imdb ? "★ "+rating : "IMDb —"}</span>
    </div>
    <div class="card-body">
      <p class="card-title">${esc(item.title)}</p>
      <div class="card-meta"><span>${metaBits.join(" · ")}</span></div>
    </div>
  </div>`;
}

function renderSkeletons(n){
  return Array.from({length:n}).map(()=>`
    <div class="card skeleton" aria-hidden="true">
      <div class="skel-poster shimmer"></div>
      <div class="skel-line shimmer"></div>
      <div class="skel-line shimmer short"></div>
    </div>`).join("");
}

function renderRail(items){
  return `<div class="rail">${items.map(renderCard).join("")}</div>`;
}
function renderGrid(items, emptyMsg){
  if(!items.length){
    return `<div class="empty-state"><span class="emoji">🔍</span><h3>هیچ ئەنجامێک نەدۆزرایەوە</h3><p>${esc(emptyMsg||"هیچ فیلمێک لەگەڵ ئەم فلتەرانە نییە.")}</p></div>`;
  }
  return `<div class="grid">${items.map(renderCard).join("")}</div>`;
}

/* ---------------------------------------------------------
   5. ROUTER
   --------------------------------------------------------- */
const routes = {};
function route(path, fn){ routes[path] = fn; }
const app = () => $("#app");

function currentPath(){
  const h = location.hash.replace(/^#/, "") || "/home";
  return h.split("?")[0];
}
function currentQuery(){
  const h = location.hash.split("?")[1] || "";
  return new URLSearchParams(h);
}

function navigate(){
  const path = currentPath();
  const parts = path.split("/").filter(Boolean); // e.g. ["title","free-1"]
  window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"});

  updateActiveNav(parts[0] || "home");

  let handler = routes[parts[0]] || routes["404"];
  app().innerHTML = renderSkeletonPage();
  requestAnimationFrame(()=>{ // simulate perceived load, avoid blank screen
    setTimeout(()=>{
      try{
        app().innerHTML = handler(parts, currentQuery());
        afterRender();
      }catch(e){
        console.error(e);
        app().innerHTML = routes["404"]();
      }
    }, 120);
  });
}

function renderSkeletonPage(){
  return `<div class="section container"><div class="grid">${renderSkeletons(10)}</div></div>`;
}

function updateActiveNav(name){
  $all("[data-nav]").forEach(a=>{
    a.classList.toggle("active", a.dataset.nav === name);
  });
}

/* ---------------------------------------------------------
   6. PAGE: HOME
   --------------------------------------------------------- */
route("home", () => {
  const trending = [...ALL_MOVIES].sort((a,b)=>demoViews(b)-demoViews(a)).slice(0,8);
  const free10 = FREE_MOVIES.slice(0,10);
  const latest = [...ALL_TITLES].sort((a,b)=>b.year-a.year).slice(0,8);
  const popular = [...ALL_MOVIES].sort((a,b)=>demoViews(b)-demoViews(a)).slice(0,8);
  const topRated = [...ALL_TITLES].filter(m=>m.imdb).sort((a,b)=>b.imdb-a.imdb).slice(0,8);
  const newSubs = [...ALL_TITLES].slice(0,8);

  return `
  <section class="hero">
    <div class="hero-inner">
      <span class="hero-eyebrow">🎬 پلاتفۆرمی کوردی بۆ فیلم و زنجیرە</span>
      <h1>فیلمێکی خۆشت بدۆزەوە</h1>
      <p>فیلم و زنجیرە و ئەنیمێ بە ژێرنووسی کوردی.</p>
      <div class="hero-actions">
        <a href="#/movies" class="btn btn-primary">گەڕان لە فیلمەکان</a>
        <a href="#/finder" class="btn btn-ghost">فیلمێکم بۆ هەڵبژێرە 🎯</a>
      </div>
    </div>
  </section>

  <div class="container">
    <section class="section" aria-labelledby="h-trending">
      <div class="section-head"><h2 id="h-trending">🔥 ئێستا بەناوبانگەکان</h2><a href="#/movies">هەموو</a></div>
      ${renderRail(tren
