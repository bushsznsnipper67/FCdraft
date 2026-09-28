from pathlib import Path

app_js = r'''/* ============================================================
   FCdraft - APP.JS
   Matched specifically to the supplied index.html + style.css
============================================================ */

const PLAYERS = [
  {id:"messi",name:"Lionel Messi",pos:"RW",ovr:91,primeOvr:95,club:"Inter Miami",price:900},
  {id:"ronaldo",name:"Cristiano Ronaldo",pos:"ST",ovr:90,primeOvr:98,club:"Al Nassr",price:850},
  {id:"mbappe",name:"Kylian Mbappe",pos:"ST",ovr:91,primeOvr:97,club:"Real Madrid",price:950},
  {id:"haaland",name:"Erling Haaland",pos:"ST",ovr:91,primeOvr:91,club:"Manchester City",price:950},
  {id:"vinicius",name:"Vinicius Jr.",pos:"LW",ovr:90,primeOvr:95,club:"Real Madrid",price:800},
  {id:"salah",name:"Mohamed Salah",pos:"RW",ovr:91,primeOvr:92,club:"Liverpool",price:800},
  {id:"bellingham",name:"Jude Bellingham",pos:"CM",ovr:90,primeOvr:91,club:"Real Madrid",price:800},
  {id:"debruyne",name:"Kevin De Bruyne",pos:"CM",ovr:86,primeOvr:91,club:"Manchester City",price:650},
  {id:"rodri",name:"Rodri",pos:"CDM",ovr:90,primeOvr:91,club:"Manchester City",price:800},
  {id:"pedri",name:"Pedri",pos:"CM",ovr:86,primeOvr:91,club:"Barcelona",price:600},
  {id:"yamal",name:"Lamine Yamal",pos:"RW",ovr:89,primeOvr:95,club:"Barcelona",price:750},
  {id:"saka",name:"Bukayo Saka",pos:"RW",ovr:87,primeOvr:90,club:"Arsenal",price:600},
  {id:"kane",name:"Harry Kane",pos:"ST",ovr:90,primeOvr:93,club:"Bayern Munich",price:800},
  {id:"lewandowski",name:"Robert Lewandowski",pos:"ST",ovr:88,primeOvr:92,club:"Barcelona",price:700},
  {id:"son",name:"Son Heung-min",pos:"LW",ovr:87,primeOvr:89,club:"LAFC",price:600},
  {id:"neymar",name:"Neymar Jr.",pos:"LW",ovr:86,primeOvr:93,club:"Santos",price:650},
  {id:"modric",name:"Luka Modric",pos:"CM",ovr:86,primeOvr:93,club:"Real Madrid",price:600},
  {id:"kroos",name:"Toni Kroos",pos:"CM",ovr:86,primeOvr:90,club:"Real Madrid",price:600},
  {id:"bernardo",name:"Bernardo Silva",pos:"CAM",ovr:88,primeOvr:90,club:"Manchester City",price:650},
  {id:"bruno",name:"Bruno Fernandes",pos:"CAM",ovr:87,primeOvr:91,club:"Manchester United",price:625},
  {id:"odegaard",name:"Martin Odegaard",pos:"CAM",ovr:88,primeOvr:90,club:"Arsenal",price:650},
  {id:"rice",name:"Declan Rice",pos:"CDM",ovr:87,primeOvr:88,club:"Arsenal",price:600},
  {id:"goretzka",name:"Leon Goretzka",pos:"CM",ovr:84,primeOvr:88,club:"Bayern Munich",price:500},
  {id:"hakimi",name:"Achraf Hakimi",pos:"RB",ovr:87,primeOvr:88,club:"Paris Saint-Germain",price:600},
  {id:"trent",name:"Trent Alexander-Arnold",pos:"RB",ovr:86,primeOvr:90,club:"Real Madrid",price:575},
  {id:"walker",name:"Kyle Walker",pos:"RB",ovr:84,primeOvr:87,club:"Burnley",price:500},
  {id:"davies",name:"Alphonso Davies",pos:"LB",ovr:86,primeOvr:88,club:"Bayern Munich",price:575},
  {id:"cancelo",name:"Joao Cancelo",pos:"LB",ovr:84,primeOvr:88,club:"Al Hilal",price:500},
  {id:"vanDijk",name:"Virgil van Dijk",pos:"CB",ovr:89,primeOvr:90,club:"Liverpool",price:750},
  {id:"saliba",name:"William Saliba",pos:"CB",ovr:87,primeOvr:88,club:"Arsenal",price:625},
  {id:"dias",name:"Ruben Dias",pos:"CB",ovr:89,primeOvr:91,club:"Manchester City",price:700},
  {id:"araujo",name:"Ronald Araujo",pos:"CB",ovr:85,primeOvr:88,club:"Barcelona",price:550},
  {id:"marquinhos",name:"Marquinhos",pos:"CB",ovr:86,primeOvr:90,club:"Paris Saint-Germain",price:575},
  {id:"courtois",name:"Thibaut Courtois",pos:"GK",ovr:89,primeOvr:91,club:"Real Madrid",price:700},
  {id:"alisson",name:"Alisson",pos:"GK",ovr:89,primeOvr:90,club:"Liverpool",price:700},
  {id:"ederson",name:"Ederson",pos:"GK",ovr:88,primeOvr:91,club:"Manchester City",price:650},
  {id:"donnarumma",name:"Gianluigi Donnarumma",pos:"GK",ovr:89,primeOvr:92,club:"Paris Saint-Germain",price:700},
  {id:"martinez",name:"Emiliano Martinez",pos:"GK",ovr:86,primeOvr:89,club:"Aston Villa",price:550},
  {id:"griezmann",name:"Antoine Griezmann",pos:"CAM",ovr:88,primeOvr:91,club:"Atletico Madrid",price:675},
  {id:"kvaratskhelia",name:"Khvicha Kvaratskhelia",pos:"LW",ovr:86,primeOvr:91,club:"Paris Saint-Germain",price:575},
  {id:"lautaro",name:"Lautaro Martinez",pos:"ST",ovr:89,primeOvr:91,club:"Inter",price:725},
  {id:"osimhen",name:"Victor Osimhen",pos:"ST",ovr:87,primeOvr:90,club:"Galatasaray",price:625},
  {id:"wirtz",name:"Florian Wirtz",pos:"CAM",ovr:89,primeOvr:94,club:"Liverpool",price:700},
  {id:"musiala",name:"Jamal Musiala",pos:"CAM",ovr:88,primeOvr:94,club:"Bayern Munich",price:675},
  {id:"foden",name:"Phil Foden",pos:"CAM",ovr:88,primeOvr:92,club:"Manchester City",price:650},
  {id:"gavi",name:"Gavi",pos:"CM",ovr:83,primeOvr:89,club:"Barcelona",price:475},
  {id:"pulisic",name:"Christian Pulisic",pos:"LW",ovr:84,primeOvr:87,club:"AC Milan",price:500},
  {id:"vini",name:"Vinicius Jr.",pos:"LW",ovr:90,primeOvr:95,club:"Real Madrid",price:800},
  {id:"doku",name:"Jeremy Doku",pos:"LW",ovr:85,primeOvr:89,club:"Manchester City",price:525},
  {id:"martinelli",name:"Gabriel Martinelli",pos:"LW",ovr:84,primeOvr:88,club:"Arsenal",price:500},
  {id:"isak",name:"Alexander Isak",pos:"ST",ovr:88,primeOvr:91,club:"Newcastle United",price:675},
  {id:"vlahovic",name:"Dusan Vlahovic",pos:"ST",ovr:84,primeOvr:88,club:"Juventus",price:500}
];

const FORMATIONS = {
  "4-3-3": [
    ["GK",50,91],["LB",18,72],["CB",39,78],["CB",61,78],["RB",82,72],
    ["CM",35,57],["CM",50,53],["CM",65,57],["LW",20,35],["ST",50,27],["RW",80,35]
  ],
  "4-4-2": [
    ["GK",50,91],["LB",18,72],["CB",39,78],["CB",61,78],["RB",82,72],
    ["LM",20,53],["CM",40,57],["CM",60,57],["RM",80,53],["ST",40,30],["ST",60,30]
  ],
  "4-2-3-1": [
    ["GK",50,91],["LB",18,72],["CB",39,78],["CB",61,78],["RB",82,72],
    ["CDM",38,60],["CDM",62,60],["LW",22,43],["CAM",50,40],["RW",78,43],["ST",50,25]
  ],
  "4-3-2-1": [
    ["GK",50,91],["LB",18,72],["CB",39,78],["CB",61,78],["RB",82,72],
    ["CM",35,58],["CM",50,54],["CM",65,58],["CAM",38,39],["CAM",62,39],["ST",50,25]
  ],
  "4-1-2-1-2": [
    ["GK",50,91],["LB",18,72],["CB",39,78],["CB",61,78],["RB",82,72],
    ["CDM",50,61],["CM",35,51],["CM",65,51],["CAM",50,39],["ST",40,25],["ST",60,25]
  ],
  "3-4-3": [
    ["GK",50,91],["CB",28,76],["CB",50,80],["CB",72,76],
    ["LM",20,57],["CM",40,55],["CM",60,55],["RM",80,57],
    ["LW",22,34],["ST",50,25],["RW",78,34]
  ],
  "3-5-2": [
    ["GK",50,91],["CB",28,76],["CB",50,80],["CB",72,76],
    ["LM",15,55],["CM",35,54],["CDM",50,59],["CM",65,54],["RM",85,55],
    ["ST",40,28],["ST",60,28]
  ],
  "5-3-2": [
    ["GK",50,91],["LB",12,72],["CB",32,77],["CB",50,80],["CB",68,77],["RB",88,72],
    ["CM",35,55],["CM",50,58],["CM",65,55],["ST",40,28],["ST",60,28]
  ],
  "5-2-3": [
    ["GK",50,91],["LB",12,72],["CB",32,77],["CB",50,80],["CB",68,77],["RB",88,72],
    ["CM",40,57],["CM",60,57],["LW",22,34],["ST",50,25],["RW",78,34]
  ]
};

const REWARDS = {
  Beginner: 50,
  Amateur: 75,
  "Semi-Pro": 100,
  Professional: 150,
  "World Class": 225,
  Legendary: 350
};

const DIFFICULTY_POWER = {
  Beginner: 55,
  Amateur: 65,
  "Semi-Pro": 72,
  Professional: 78,
  "World Class": 84,
  Legendary: 90
};

const PRIME_COST = 1000;
const STORAGE_KEY = "fcdraft_state_v3";

let state = {
  coins: 1500,
  club: [],
  primes: [],
  formation: "4-3-3",
  squad: {},
  matches: []
};

let currentDraftPlayers = new Set();
let currentChoicePlayers = new Set();
let currentPositionKey = null;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      state = {
        ...state,
        ...saved,
        club: Array.isArray(saved.club) ? saved.club : [],
        primes: Array.isArray(saved.primes) ? saved.primes : [],
        squad: saved.squad && typeof saved.squad === "object" ? saved.squad : {},
        matches: Array.isArray(saved.matches) ? saved.matches : []
      };
    }
  } catch (e) {
    console.warn("Could not load saved game.", e);
  }
}

function getPlayer(id) {
  return PLAYERS.find(p => p.id === id);
}

function getPlayerOvr(player) {
  if (!player) return 0;
  return state.primes.includes(player.id) ? Math.max(player.ovr, player.primeOvr) : player.ovr;
}

function tier(ovr) {
  if (ovr >= 90) return "Very Rare";
  if (ovr === 89) return "Epic";
  if (ovr >= 85) return "Rare";
  if (ovr >= 75) return "Gold";
  if (ovr >= 65) return "Silver";
  return "Bronze";
}

function playerSpawnWeight(player) {
  const rating = getPlayerOvr(player);
  if (rating >= 95) return 0.25;
  if (rating >= 92) return 0.5;
  if (rating >= 90) return 1;
  if (rating >= 88) return 2;
  if (rating >= 85) return 4;
  if (rating >= 82) return 7;
  if (rating >= 78) return 12;
  if (rating >= 75) return 18;
  if (rating >= 70) return 28;
  if (rating >= 65) return 40;
  return 55;
}

function weightedRandomPlayer(pool) {
  if (!pool.length) return null;

  const total = pool.reduce((sum, player) => sum + playerSpawnWeight(player), 0);
  let roll = Math.random() * total;

  for (const player of pool) {
    roll -= playerSpawnWeight(player);
    if (roll <= 0) return player;
  }

  return pool[pool.length - 1];
}

function compatiblePositions(position) {
  const groups = {
    GK: ["GK"],
    LB: ["LB","LWB"],
    RB: ["RB","RWB"],
    CB: ["CB"],
    LWB: ["LB","LWB"],
    RWB: ["RB","RWB"],
    LM: ["LW","LM","CAM"],
    RM: ["RW","RM","CAM"],
    LW: ["LW","LM"],
    RW: ["RW","RM"],
    ST: ["ST"],
    CAM: ["CAM","CM"],
    CM: ["CM","CAM","CDM"],
    CDM: ["CDM","CM"]
  };
  return groups[position] || [position];
}

function candidates(position) {
  const allowed = compatiblePositions(position);

  let pool = PLAYERS.filter(player =>
    allowed.includes(player.pos) &&
    !currentDraftPlayers.has(player.id) &&
    !currentChoicePlayers.has(player.id)
  );

  const choices = [];

  while (choices.length < 3 && pool.length) {
    const player = weightedRandomPlayer(pool);
    if (!player) break;

    choices.push(player);
    currentDraftPlayers.add(player.id);

    pool = pool.filter(p => p.id !== player.id);
  }

  // Safety fallback if a position has fewer than 3 compatible players.
  if (choices.length < 3) {
    let backup = PLAYERS.filter(player =>
      !currentDraftPlayers.has(player.id) &&
      !choices.some(p => p.id === player.id)
    );

    while (choices.length < 3 && backup.length) {
      const player = weightedRandomPlayer(backup);
      if (!player) break;

      choices.push(player);
      currentDraftPlayers.add(player.id);
      backup = backup.filter(p => p.id !== player.id);
    }
  }

  return choices;
}

function updateCoins() {
  const coinCount = document.getElementById("coinCount");
  const marketCoins = document.getElementById("marketCoins");

  if (coinCount) coinCount.textContent = state.coins;
  if (marketCoins) marketCoins.textContent = state.coins;
}

function showPage(page) {
  const pageMap = {
    home: "homePage",
    draft: "draftPage",
    market: "marketPage",
    club: "clubPage",
    matches: "matchesPage"
  };

  Object.values(pageMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("active-page");
  });

  const target = document.getElementById(pageMap[page] || "homePage");
  if (target) target.classList.add("active-page");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  const buttons = [...document.querySelectorAll(".nav-btn")];
  const labels = {
    home: "Home",
    draft: "Draft",
    market: "Market",
    club: "My Club",
    matches: "Matches"
  };

  const active = buttons.find(btn => btn.textContent.trim() === labels[page]);
  if (active) active.classList.add("active");

  if (page === "market") renderMarket();
  if (page === "club") renderClub();
  if (page === "matches") renderHistory();
  if (page === "draft") renderPitch();
}

function selectFormation(formation) {
  if (!FORMATIONS[formation]) return;

  state.formation = formation;
  state.squad = {};
  currentPositionKey = null;
  currentChoicePlayers.clear();

  const instruction = document.getElementById("choiceInstruction");
  const choices = document.getElementById("playerChoices");

  if (instruction) instruction.textContent = "Select a position on the pitch.";
  if (choices) {
    choices.innerHTML = `
      <div class="empty-choice">
        <span>⚽</span>
        <p>Select a position to see your 3 player choices.</p>
      </div>
    `;
  }

  saveState();
  renderPitch();
}

function startNewDraft() {
  currentDraftPlayers.clear();
  currentChoicePlayers.clear();
  currentPositionKey = null;

  state.squad = {};
  state.formation = document.getElementById("formationSelect")?.value || state.formation || "4-3-3";

  const select = document.getElementById("formationSelect");
  if (select) select.value = state.formation;

  saveState();
  renderPitch();

  const instruction = document.getElementById("choiceInstruction");
  if (instruction) instruction.textContent = "Select a position on the pitch.";

  const choices = document.getElementById("playerChoices");
  if (choices) {
    choices.innerHTML = `
      <div class="empty-choice">
        <span>⚽</span>
        <p>Select a position to see your 3 player choices.</p>
      </div>
    `;
  }

  notify("New draft started!");
}

function renderPitch() {
  const container = document.getElementById("formationPositions");
  if (!container) return;

  const formation = state.formation || "4-3-3";
  const positions = FORMATIONS[formation] || FORMATIONS["4-3-3"];

  container.innerHTML = "";

  positions.forEach((item, index) => {
    const [pos, left, top] = item;
    const key = `${pos}-${index}`;
    const playerId = state.squad[key];
    const player = playerId ? getPlayer(playerId) : null;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "pitch-position";
    if (key === currentPositionKey) button.classList.add("selected");

    button.style.left = `${left}%`;
    button.style.top = `${top}%`;

    button.innerHTML = player
      ? `<strong>${getPlayerOvr(player)}</strong><small>${player.name}</small>`
      : `<strong>${pos}</strong><small>Select</small>`;

    button.addEventListener("click", () => selectPosition(key, pos));
    container.appendChild(button);
  });
}

function selectPosition(key, position) {
  currentPositionKey = key;
  currentChoicePlayers.clear();

  const choices = candidates(position);

  const instruction = document.getElementById("choiceInstruction");
  if (instruction) {
    instruction.textContent = `Choose a ${position} for this position.`;
  }

  const container = document.getElementById("playerChoices");
  if (!container) return;

  container.innerHTML = "";

  choices.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";

    const ovr = getPlayerOvr(player);

    card.innerHTML = `
      <div class="player-rating">${ovr}</div>
      <div class="player-info">
        <h4>${player.name}</h4>
        <p>${player.club} · ${tier(ovr)}</p>
      </div>
      <div class="player-position">${player.pos}</div>
    `;

    card.addEventListener("click", () => pickPlayer(player.id));
    container.appendChild(card);
  });

  renderPitch();
}

function pickPlayer(playerId) {
  if (!currentPositionKey) {
    notify("Select a position first.");
    return;
  }

  const player = getPlayer(playerId);
  if (!player) return;

  state.squad[currentPositionKey] = playerId;

  // The selected player is now part of the draft squad.
  currentChoicePlayers.clear();

  saveState();
  renderPitch();

  const completed = FORMATIONS[state.formation].every((_, index) => {
    const [pos] = FORMATIONS[state.formation][index];
    return Boolean(state.squad[`${pos}-${index}`]);
  });

  const container = document.getElementById("playerChoices");
  const instruction = document.getElementById("choiceInstruction");

  if (completed) {
    if (instruction) instruction.textContent = "Draft complete! Your squad is ready.";
    if (container) {
      container.innerHTML = `
        <div class="empty-choice">
          <span>🏆</span>
          <p>Your squad is complete!</p>
        </div>
      `;
    }
    notify("Draft complete!");
  } else {
    if (instruction) instruction.textContent = "Select another position on the pitch.";
    if (container) {
      container.innerHTML = `
        <div class="empty-choice">
          <span>⚽</span>
          <p>Select another position to continue your draft.</p>
        </div>
      `;
    }
  }
}

function playerCardHTML(player, options = {}) {
  const ovr = getPlayerOvr(player);
  const prime = state.primes.includes(player.id);

  return `
    <div class="player-card" onclick="openPlayerModal('${player.id}')">
      <div class="player-rating">${ovr}</div>
      <div class="player-info">
        <h4>${player.name}${prime ? ' 👑' : ''}</h4>
        <p>${player.club} · ${tier(ovr)}</p>
      </div>
      <div>
        <div class="player-position">${player.pos}</div>
        ${options.price ? `<div class="player-price">🪙 ${options.price}</div>` : ""}
      </div>
    </div>
  `;
}

function renderMarket() {
  const container = document.getElementById("marketPlayers");
  if (!container) return;

  updateCoins();

  const owned = new Set(state.club);

  container.innerHTML = PLAYERS.map(player => {
    if (owned.has(player.id)) {
      return `
        <div class="player-card">
          <div class="player-rating">${getPlayerOvr(player)}</div>
          <div class="player-info">
            <h4>${player.name}</h4>
            <p>${player.club} · Owned</p>
          </div>
          <div class="player-position">${player.pos}</div>
        </div>
      `;
    }

    return `
      <div class="player-card" onclick="buyPlayer('${player.id}')">
        <div class="player-rating">${getPlayerOvr(player)}</div>
        <div class="player-info">
          <h4>${player.name}</h4>
          <p>${player.club} · ${tier(getPlayerOvr(player))}</p>
        </div>
        <div>
          <div class="player-position">${player.pos}</div>
          <div class="player-price">🪙 ${player.price}</div>
        </div>
      </div>
    `;
  }).join("");
}

function buyPlayer(playerId) {
  const player = getPlayer(playerId);
  if (!player) return;

  if (state.club.includes(playerId)) {
    notify("You already own this player.");
    return;
  }

  if (state.coins < player.price) {
    notify("Not enough coins.");
    return;
  }

  state.coins -= player.price;
  state.club.push(playerId);

  saveState();
  updateCoins();
  renderMarket();
  renderClub();

  notify(`${player.name} added to your club!`);
}

function renderClub() {
  const container = document.getElementById("clubPlayers");
  if (!container) return;

  if (!state.club.length) {
    container.innerHTML = `
      <div class="empty-choice">
        <span>👥</span>
        <p>You don't own any players yet. Complete a draft or visit the Market.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.club.map(id => {
    const player = getPlayer(id);
    if (!player) return "";

    const prime = state.primes.includes(id);

    return `
      <div class="player-card" onclick="openPlayerModal('${id}')">
        <div class="player-rating">${getPlayerOvr(player)}</div>
        <div class="player-info">
          <h4>${player.name}${prime ? " 👑" : ""}</h4>
          <p>${player.club} · ${tier(getPlayerOvr(player))}</p>
        </div>
        <div>
          <div class="player-position">${player.pos}</div>
          ${!prime && player.primeOvr > player.ovr
            ? `<button class="prime-btn" onclick="event.stopPropagation(); makePrime('${id}')">PRIME 🪙 ${PRIME_COST}</button>`
            : ""}
        </div>
      </div>
    `;
  }).join("");
}

function makePrime(playerId) {
  const player = getPlayer(playerId);
  if (!player) return;

  if (!state.club.includes(playerId)) {
    notify("You must own this player first.");
    return;
  }

  if (state.primes.includes(playerId)) {
    notify("This player is already Prime.");
    return;
  }

  if (state.coins < PRIME_COST) {
    notify("You need 1000 coins to make a player Prime.");
    return;
  }

  state.coins -= PRIME_COST;
  state.primes.push(playerId);

  saveState();
  updateCoins();
  renderClub();
  renderMarket();

  notify(`${player.name} is now a Prime player!`);
}

function clubRating() {
  const ids = Object.values(state.squad).filter(Boolean);
  if (!ids.length) return 0;

  const ratings = ids
    .map(id => getPlayer(id))
    .filter(Boolean)
    .map(getPlayerOvr);

  return Math.round(ratings.reduce((a,b) => a+b, 0) / ratings.length);
}

function playMatch(difficulty) {
  if (!REWARDS[difficulty]) return;

  const rating = clubRating();

  if (!rating) {
    notify("Build a squad before playing a match.");
    return;
  }

  const power = DIFFICULTY_POWER[difficulty];
  const chance = Math.max(0.20, Math.min(0.90, 0.50 + (rating - power) * 0.025));
  const win = Math.random() < chance;

  const reward = win ? REWARDS[difficulty] : 0;

  if (win) {
    state.coins += reward;
  }

  state.matches.unshift({
    difficulty,
    result: win ? "WIN" : "LOSS",
    reward,
    rating,
    date: new Date().toLocaleString()
  });

  state.matches = state.matches.slice(0, 30);

  saveState();
  updateCoins();
  renderHistory();

  notify(
    win
      ? `You won! +${reward} coins`
      : "You lost this match."
  );
}

function renderHistory() {
  const container = document.getElementById("matchHistory");
  if (!container) return;

  if (!state.matches.length) {
    container.innerHTML = `
      <div class="empty-choice">
        <span>📋</span>
        <p>No matches played yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.matches.map(match => `
    <div class="match-history-item">
      <div>
        <strong>${match.result}</strong>
        <div>${match.difficulty}</div>
        <small>Squad rating: ${match.rating}</small>
      </div>
      <div>
        <strong>${match.reward ? `+${match.reward} coins` : "No reward"}</strong>
        <small>${match.date}</small>
      </div>
    </div>
  `).join("");
}

function openPlayerModal(playerId) {
  const player = getPlayer(playerId);
  const modal = document.getElementById("playerModal");
  const content = document.getElementById("modalPlayerContent");

  if (!player || !modal || !content) return;

  const ovr = getPlayerOvr(player);
  const prime = state.primes.includes(player.id);

  content.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:64px;font-weight:900;">${ovr}</div>
      <h2>${player.name}</h2>
      <p style="color:var(--muted);margin:8px 0 20px;">
        ${player.pos} · ${player.club}
      </p>
      <p><strong>Rarity:</strong> ${tier(ovr)}</p>
      <p style="margin-top:8px;"><strong>Prime OVR:</strong> ${player.primeOvr}</p>
      ${prime
        ? `<p class="prime-rating" style="margin-top:12px;">👑 PRIME PLAYER</p>`
        : state.club.includes(player.id) && player.primeOvr > player.ovr
          ? `<button class="prime-btn" style="margin-top:18px;" onclick="makePrime('${player.id}'); closePlayerModal();">Make Prime · 🪙 ${PRIME_COST}</button>`
          : ""}
    </div>
  `;

  modal.classList.remove("hidden");
}

function closePlayerModal() {
  const modal = document.getElementById("playerModal");
  if (modal) modal.classList.add("hidden");
}

function notify(message) {
  const notification = document.getElementById("notification");
  const text = document.getElementById("notificationText");

  if (!notification || !text) return;

  text.textContent = message;
  notification.classList.add("show");

  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => {
    notification.classList.remove("show");
  }, 2200);
}

function init() {
  loadState();

  const formationSelect = document.getElementById("formationSelect");
  if (formationSelect) {
    formationSelect.value = FORMATIONS[state.formation]
      ? state.formation
      : "4-3-3";
    state.formation = formationSelect.value;
  }

  updateCoins();
  renderPitch();
  renderMarket();
  renderClub();
  renderHistory();
  showPage("home");
}

window.showPage = showPage;
window.selectFormation = selectFormation;
window.startNewDraft = startNewDraft;
window.playMatch = playMatch;
window.closePlayerModal = closePlayerModal;
window.openPlayerModal = openPlayerModal;
window.buyPlayer = buyPlayer;
window.makePrime = makePrime;

document.addEventListener("DOMContentLoaded", init);
'''

path = Path("/mnt/data/fcdraft-app.js")
path.write_text(app_js, encoding="utf-8")

print(f"Created: {path}")
print(f"Lines: {len(app_js.splitlines())}")
