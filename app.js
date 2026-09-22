// ============================================================
// FCdraft - COMPLETE APP.JS
// ============================================================


// ============================================================
// PLAYER DATABASE
// ============================================================

const players = [

  // =========================
  // GOALKEEPERS
  // =========================

  { id: 1, name: "Thibaut Courtois", pos: "GK", ovr: 89, primeOvr: 92, club: "Real Madrid", price: 700 },
  { id: 2, name: "Alisson", pos: "GK", ovr: 89, primeOvr: 90, club: "Liverpool", price: 700 },
  { id: 3, name: "Ederson", pos: "GK", ovr: 88, primeOvr: 89, club: "Manchester City", price: 650 },
  { id: 4, name: "Emiliano Martinez", pos: "GK", ovr: 86, primeOvr: 86, club: "Aston Villa", price: 500 },
  { id: 5, name: "Mike Maignan", pos: "GK", ovr: 87, primeOvr: 87, club: "AC Milan", price: 550 },
  { id: 6, name: "Gianluigi Donnarumma", pos: "GK", ovr: 89, primeOvr: 91, club: "PSG", price: 700 },

  // =========================
  // DEFENDERS
  // =========================

  { id: 7, name: "Virgil van Dijk", pos: "CB", ovr: 90, primeOvr: 90, club: "Liverpool", price: 900 },
  { id: 8, name: "William Saliba", pos: "CB", ovr: 87, primeOvr: 88, club: "Arsenal", price: 600 },
  { id: 9, name: "Antonio Rudiger", pos: "CB", ovr: 86, primeOvr: 88, club: "Real Madrid", price: 550 },
  { id: 10, name: "Marquinhos", pos: "CB", ovr: 87, primeOvr: 89, club: "PSG", price: 600 },
  { id: 11, name: "Ruben Dias", pos: "CB", ovr: 89, primeOvr: 89, club: "Manchester City", price: 700 },
  { id: 12, name: "Matthijs de Ligt", pos: "CB", ovr: 85, primeOvr: 89, club: "Manchester United", price: 500 },

  { id: 13, name: "Achraf Hakimi", pos: "RB", ovr: 89, primeOvr: 90, club: "PSG", price: 700 },
  { id: 14, name: "Trent Alexander-Arnold", pos: "RB", ovr: 86, primeOvr: 87, club: "Real Madrid", price: 550 },
  { id: 15, name: "Kyle Walker", pos: "RB", ovr: 84, primeOvr: 85, club: "Manchester City", price: 450 },

  { id: 16, name: "Theo Hernandez", pos: "LB", ovr: 87, primeOvr: 88, club: "AC Milan", price: 600 },
  { id: 17, name: "Alphonso Davies", pos: "LB", ovr: 86, primeOvr: 87, club: "Bayern Munich", price: 550 },
  { id: 18, name: "Nuno Mendes", pos: "LB", ovr: 86, primeOvr: 87, club: "PSG", price: 550 },

  // =========================
  // MIDFIELDERS
  // =========================

  { id: 19, name: "Rodri", pos: "CDM", ovr: 90, primeOvr: 91, club: "Manchester City", price: 900 },
  { id: 20, name: "Declan Rice", pos: "CDM", ovr: 87, primeOvr: 88, club: "Arsenal", price: 600 },
  { id: 21, name: "Joshua Kimmich", pos: "CDM", ovr: 89, primeOvr: 90, club: "Bayern Munich", price: 700 },
  { id: 22, name: "Aurelien Tchouameni", pos: "CDM", ovr: 84, primeOvr: 86, club: "Real Madrid", price: 450 },

  { id: 23, name: "Jude Bellingham", pos: "CM", ovr: 90, primeOvr: 91, club: "Real Madrid", price: 950 },
  { id: 24, name: "Pedri", pos: "CM", ovr: 89, primeOvr: 90, club: "Barcelona", price: 750 },
  { id: 25, name: "Federico Valverde", pos: "CM", ovr: 88, primeOvr: 89, club: "Real Madrid", price: 700 },
  { id: 26, name: "Kevin De Bruyne", pos: "CM", ovr: 88, primeOvr: 94, club: "Manchester City", price: 750 },
  { id: 27, name: "Martin Odegaard", pos: "CM", ovr: 88, primeOvr: 89, club: "Arsenal", price: 650 },

  { id: 28, name: "Bruno Fernandes", pos: "CAM", ovr: 87, primeOvr: 91, club: "Manchester United", price: 600 },
  { id: 29, name: "Florian Wirtz", pos: "CAM", ovr: 89, primeOvr: 90, club: "Liverpool", price: 750 },
  { id: 30, name: "Jamal Musiala", pos: "CAM", ovr: 88, primeOvr: 90, club: "Bayern Munich", price: 700 },

  // =========================
  // WINGERS
  // =========================

  { id: 31, name: "Vinicius Jr", pos: "LW", ovr: 90, primeOvr: 92, club: "Real Madrid", price: 950 },
  { id: 32, name: "Rafael Leao", pos: "LW", ovr: 86, primeOvr: 88, club: "AC Milan", price: 600 },
  { id: 33, name: "Khvicha Kvaratskhelia", pos: "LW", ovr: 86, primeOvr: 89, club: "PSG", price: 600 },

  { id: 34, name: "Mohamed Salah", pos: "RW", ovr: 91, primeOvr: 92, club: "Liverpool", price: 1000 },
  { id: 35, name: "Bukayo Saka", pos: "RW", ovr: 88, primeOvr: 89, club: "Arsenal", price: 700 },
  { id: 36, name: "Lamine Yamal", pos: "RW", ovr: 89, primeOvr: 93, club: "Barcelona", price: 900 },

  // =========================
  // STRIKERS
  // =========================

  { id: 37, name: "Kylian Mbappe", pos: "ST", ovr: 91, primeOvr: 97, club: "Real Madrid", price: 1100 },
  { id: 38, name: "Erling Haaland", pos: "ST", ovr: 91, primeOvr: 94, club: "Manchester City", price: 1100 },
  { id: 39, name: "Harry Kane", pos: "ST", ovr: 90, primeOvr: 93, club: "Bayern Munich", price: 900 },
  { id: 40, name: "Robert Lewandowski", pos: "ST", ovr: 88, primeOvr: 95, club: "Barcelona", price: 750 },
  { id: 41, name: "Lautaro Martinez", pos: "ST", ovr: 89, primeOvr: 90, club: "Inter Milan", price: 750 },
  { id: 42, name: "Victor Osimhen", pos: "ST", ovr: 87, primeOvr: 90, club: "Galatasaray", price: 650 },

  // =========================
  // LOWER-RATED PLAYERS
  // These make common players appear more often.
  // =========================

  { id: 43, name: "Player A", pos: "CM", ovr: 82, primeOvr: 83, club: "FCdraft United", price: 300 },
  { id: 44, name: "Player B", pos: "CB", ovr: 79, primeOvr: 80, club: "FCdraft City", price: 250 },
  { id: 45, name: "Player C", pos: "RW", ovr: 76, primeOvr: 78, club: "FCdraft FC", price: 200 },
  { id: 46, name: "Player D", pos: "ST", ovr: 72, primeOvr: 75, club: "FCdraft FC", price: 150 },
  { id: 47, name: "Player E", pos: "LB", ovr: 69, primeOvr: 72, club: "FCdraft FC", price: 120 },
  { id: 48, name: "Player F", pos: "GK", ovr: 65, primeOvr: 68, club: "FCdraft FC", price: 100 }
];


// ============================================================
// GAME STATE
// ============================================================

const DEFAULT_COINS = 1500;

let state = {
  coins: DEFAULT_COINS,

  club: [],

  primes: [],

  formation: "4-3-3",

  matches: [],

  draftStarted: false
};


// ============================================================
// LOAD / SAVE
// ============================================================

function loadGame() {

  try {

    const saved = localStorage.getItem("fcdraft_state");

    if (saved) {

      const parsed = JSON.parse(saved);

      state = {
        ...state,
        ...parsed
      };

    }

  } catch (error) {

    console.error("Could not load game:", error);

  }

}


function saveGame() {

  try {

    localStorage.setItem(
      "fcdraft_state",
      JSON.stringify(state)
    );

  } catch (error) {

    console.error("Could not save game:", error);

  }

}


// ============================================================
// PLAYER OVR
// ============================================================

function getPlayerOvr(player) {

  if (!player) {
    return 0;
  }

  if (state.primes.includes(player.id)) {
    return player.primeOvr || player.ovr;
  }

  return player.ovr;
}


// ============================================================
// PRIME SYSTEM
// ============================================================

const PRIME_COST = 1000;


function isPrime(player) {

  return state.primes.includes(player.id);

}


function makePrime(player) {

  if (!player) {
    return;
  }

  if (isPrime(player)) {

    notify("This player is already Prime.");

    return;

  }

  if (state.coins < PRIME_COST) {

    notify("You need 1,000 coins to make a player Prime.");

    return;

  }

  state.coins -= PRIME_COST;

  state.primes.push(player.id);

  saveGame();

  updateAll();

  notify(
    `${player.name} is now PRIME!`
  );

  openPlayerModal(player);

}


// ============================================================
// PLAYER RARITY
// ============================================================

function getRarity(player) {

  const rating = getPlayerOvr(player);

  if (rating >= 90) return "Very Rare";
  if (rating >= 89) return "Epic";
  if (rating >= 85) return "Rare";
  if (rating >= 75) return "Gold";
  if (rating >= 65) return "Silver";

  return "Bronze";
}


// ============================================================
// RANDOM PLAYER SPAWN
// ============================================================

// Players that have appeared anywhere in THIS draft.
let currentDraftPlayers = new Set();

// Players currently displayed.
let currentChoicePlayers = new Set();


// Higher rating = lower chance.
// Lower rating = higher chance.

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

  if (!pool || pool.length === 0) {
    return null;
  }

  let totalWeight = 0;

  for (const player of pool) {

    totalWeight += playerSpawnWeight(player);

  }

  let random = Math.random() * totalWeight;

  for (const player of pool) {

    random -= playerSpawnWeight(player);

    if (random <= 0) {
      return player;
    }

  }

  return pool[pool.length - 1];

}


// ============================================================
// POSITION COMPATIBILITY
// ============================================================

function compatiblePositions(position) {

  const map = {

    GK: ["GK"],

    CB: ["CB"],

    LB: ["LB", "LWB"],

    RB: ["RB", "RWB"],

    CDM: ["CDM", "CM"],

    CM: ["CM", "CDM", "CAM"],

    CAM: ["CAM", "CM"],

    LW: ["LW", "LM"],

    RW: ["RW", "RM"],

    ST: ["ST", "CF"]

  };

  return map[position] || [position];

}


// ============================================================
// GET THREE PLAYERS
// ============================================================

function candidates(position) {

  const allowed = compatiblePositions(position);

  let pool = players.filter(player => {

    return (
      allowed.includes(player.pos) &&
      !currentDraftPlayers.has(player.id)
    );

  });


  const choices = [];


  while (
    choices.length < 3 &&
    pool.length > 0
  ) {

    const player = weightedRandomPlayer(pool);

    if (!player) {
      break;
    }

    choices.push(player);

    // IMPORTANT:
    // Every player shown is immediately marked as used.
    // Therefore they CANNOT appear later in this draft.

    currentDraftPlayers.add(player.id);

    currentChoicePlayers.add(player.id);

    pool = pool.filter(
      p => p.id !== player.id
    );

  }


  // Backup if the position has fewer than 3 unused players.

  if (choices.length < 3) {

    let backup = players.filter(player => {

      return !currentDraftPlayers.has(player.id);

    });


    while (
      choices.length < 3 &&
      backup.length > 0
    ) {

      const player = weightedRandomPlayer(backup);

      if (!player) {
        break;
      }

      choices.push(player);

      currentDraftPlayers.add(player.id);

      currentChoicePlayers.add(player.id);

      backup = backup.filter(
        p => p.id !== player.id
      );

    }

  }


  return [
    ...new Map(
      choices.map(p => [p.id, p])
    ).values()
  ].slice(0, 3);

}


// ============================================================
// RESET DRAFT
// ============================================================

function resetDraftPlayerPool() {

  currentDraftPlayers.clear();

  currentChoicePlayers.clear();

}


// ============================================================
// START PLAYER CHOICE
// ============================================================

function startPlayerChoice() {

  currentChoicePlayers.clear();

}


// ============================================================
// FORMATIONS
// ============================================================

const formations = {

  "4-3-3": [
    { pos: "GK", x: 50, y: 91 },
    { pos: "LB", x: 17, y: 72 },
    { pos: "CB", x: 39, y: 75 },
    { pos: "CB", x: 61, y: 75 },
    { pos: "RB", x: 83, y: 72 },
    { pos: "CM", x: 28, y: 52 },
    { pos: "CM", x: 50, y: 48 },
    { pos: "CM", x: 72, y: 52 },
    { pos: "LW", x: 18, y: 25 },
    { pos: "ST", x: 50, y: 20 },
    { pos: "RW", x: 82, y: 25 }
  ],

  "4-4-2": [
    { pos: "GK", x: 50, y: 91 },
    { pos: "LB", x: 17, y: 72 },
    { pos: "CB", x: 39, y: 75 },
    { pos: "CB", x: 61, y: 75 },
    { pos: "RB", x: 83, y: 72 },
    { pos: "LM", x: 17, y: 50 },
    { pos: "CM", x: 39, y: 52 },
    { pos: "CM", x: 61, y: 52 },
    { pos: "RM", x: 83, y: 50 },
    { pos: "ST", x: 38, y: 23 },
    { pos: "ST", x: 62, y: 23 }
  ],

  "4-2-3-1": [
    { pos: "GK", x: 50, y: 91 },
    { pos: "LB", x: 17, y: 72 },
    { pos: "CB", x: 39, y: 75 },
    { pos: "CB", x: 61, y: 75 },
    { pos: "RB", x: 83, y: 72 },
    { pos: "CDM", x: 38, y: 56 },
    { pos: "CDM", x: 62, y: 56 },
    { pos: "LW", x: 20, y: 36 },
    { pos: "CAM", x: 50, y: 36 },
    { pos: "RW", x: 80, y: 36 },
    { pos: "ST", x: 50, y: 18 }
  ],

  "3-5-2": [
    { pos: "GK", x: 50, y: 91 },
    { pos: "CB", x: 27, y: 73 },
    { pos: "CB", x: 50, y: 77 },
    { pos: "CB", x: 73, y: 73 },
    { pos: "LM", x: 12, y: 52 },
    { pos: "CM", x: 32, y: 54 },
    { pos: "CM", x: 50, y: 48 },
    { pos: "CM", x: 68, y: 54 },
    { pos: "RM", x: 88, y: 52 },
    { pos: "ST", x: 38, y: 23 },
    { pos: "ST", x: 62, y: 23 }
  ]

};


// ============================================================
// CURRENT FORMATION
// ============================================================

let selectedPositionIndex = null;


function selectFormation(value) {

  if (!formations[value]) {
    return;
  }

  state.formation = value;

  selectedPositionIndex = null;

  saveGame();

  renderPitch();

  clearChoices();

}


// ============================================================
// START NEW DRAFT
// ============================================================

function startNewDraft() {

  resetDraftPlayerPool();

  state.draftStarted = true;

  selectedPositionIndex = null;

  saveGame();

  renderPitch();

  clearChoices();

  notify("New draft started!");

}


// ============================================================
// RENDER PITCH
// ============================================================

function renderPitch() {

  const container =
    document.querySelector(".formation-positions");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  const formation =
    formations[state.formation] || formations["4-3-3"];


  formation.forEach((slot, index) => {

    const button =
      document.createElement("button");

    button.className = "pitch-position";

    button.type = "button";

    button.style.left = `${slot.x}%`;

    button.style.top = `${slot.y}%`;

    const playerId =
      state.club[index];

    if (playerId) {

      const player =
        players.find(p => p.id === playerId);

      if (player) {

        button.innerHTML = `
          <strong>${getPlayerOvr(player)}</strong>
          <small>${player.name}</small>
        `;

      }

    } else {

      button.innerHTML = `
        <strong>${slot.pos}</strong>
        <small>Choose</small>
      `;

    }


    button.addEventListener(
      "click",
      () => {

        if (state.club[index]) {

          const player =
            players.find(
              p => p.id === state.club[index]
            );

          if (player) {
            openPlayerModal(player);
          }

          return;

        }

        selectPosition(index);

      }
    );


    if (selectedPositionIndex === index) {
      button.classList.add("selected");
    }


    container.appendChild(button);

  });

}


// ============================================================
// SELECT POSITION
// ============================================================

function selectPosition(index) {

  const formation =
    formations[state.formation] || formations["4-3-3"];

  const slot = formation[index];

  if (!slot) {
    return;
  }

  selectedPositionIndex = index;

  startPlayerChoice();

  renderPitch();

  const choices =
    candidates(slot.pos);

  renderChoices(choices);

}


// ============================================================
// RENDER CHOICES
// ============================================================

function renderChoices(choices) {

  const container =
    document.querySelector(".player-choices");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  if (!choices || choices.length === 0) {

    container.innerHTML = `
      <div class="empty-choice">
        <span>⚽</span>
        <p>No players available.</p>
      </div>
    `;

    return;

  }


  choices.forEach(player => {

    const card =
      document.createElement("div");

    card.className = "player-card";

    card.innerHTML = `
      <div class="player-rating">
        ${getPlayerOvr(player)}
      </div>

      <div class="player-info">
        <h4>${player.name}</h4>
        <p>${player.club}</p>
        <span class="player-position">
          ${player.pos} • ${getRarity(player)}
        </span>
      </div>

      <div class="player-price">
        ${player.price} 🪙
      </div>
    `;


    card.addEventListener(
      "click",
      () => pick(player)
    );


    container.appendChild(card);

  });

}


// ============================================================
// PICK PLAYER
// ============================================================

function pick(player) {

  if (!player) {
    return;
  }

  if (selectedPositionIndex === null) {

    notify("Choose a position first.");

    return;

  }


  // Make sure the same player cannot be added twice.

  if (state.club.includes(player.id)) {

    notify("You already have this player.");

    return;

  }


  state.club[selectedPositionIndex] =
    player.id;


  selectedPositionIndex = null;

  currentChoicePlayers.clear();

  saveGame();

  renderPitch();

  clearChoices();

  renderClub();

  notify(
    `${player.name} joined your club!`
  );

}


// ============================================================
// CLEAR CHOICES
// ============================================================

function clearChoices() {

  const container =
    document.querySelector(".player-choices");

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="empty-choice">
      <span>⚽</span>
      <p>Select a position to see 3 player choices.</p>
    </div>
  `;

}


// ============================================================
// MARKET
// ============================================================

function renderMarket() {

  const container =
    document.querySelector("#marketPlayers");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  players.forEach(player => {

    const card =
      document.createElement("div");

    card.className = "player-card";

    const owned =
      state.club.includes(player.id);

    const prime =
      isPrime(player);


    card.innerHTML = `
      <div class="player-rating">
        ${getPlayerOvr(player)}
      </div>

      <div class="player-info">
        <h4>${player.name}</h4>
        <p>${player.club}</p>
        <span class="player-position">
          ${player.pos} • ${getRarity(player)}
        </span>
      </div>

      <div>

        ${
          owned
          ? `<button class="secondary-btn" type="button">
               Owned
             </button>`
          : `<button class="primary-btn buy-player" type="button">
               ${player.price} 🪙
             </button>`
        }

        ${
          owned && !prime
          ? `<button
               class="prime-btn"
               type="button"
               style="margin-top:6px;"
             >
               PRIME 1000
             </button>`
          : ""
        }

      </div>
    `;


    const buyButton =
      card.querySelector(".buy-player");


    if (buyButton) {

      buyButton.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          buyPlayer(player);

        }
      );

    }


    const primeButton =
      card.querySelector(".prime-btn");


    if (primeButton) {

      primeButton.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          makePrime(player);

        }
      );

    }


    card.addEventListener(
      "click",
      () => openPlayerModal(player)
    );


    container.appendChild(card);

  });

}


// ============================================================
// BUY PLAYER
// ============================================================

function buyPlayer(player) {

  if (state.club.includes(player.id)) {

    notify("You already own this player.");

    return;

  }


  if (state.coins < player.price) {

    notify("Not enough coins.");

    return;

  }


  state.coins -= player.price;

  // Add player to first empty club position.
  const formation =
    formations[state.formation] || formations["4-3-3"];

  let emptyIndex = -1;

  for (
    let i = 0;
    i < formation.length;
    i++
  ) {

    if (!state.club[i]) {

      emptyIndex = i;
      break;

    }

  }


  if (emptyIndex !== -1) {

    state.club[emptyIndex] =
      player.id;

  } else {

    // Club can hold players beyond the starting XI.
    state.club.push(player.id);

  }


  saveGame();

  updateAll();

  notify(
    `${player.name} purchased!`
  );

}


// ============================================================
// MY CLUB
// ============================================================

function renderClub() {

  const container =
    document.querySelector("#clubPlayers");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  const ownedPlayers =
    state.club
      .map(id =>
        players.find(
          player => player.id === id
        )
      )
      .filter(Boolean);


  if (ownedPlayers.length === 0) {

    container.innerHTML = `
      <div class="empty-choice">
        <span>👕</span>
        <p>Your club is empty.</p>
      </div>
    `;

    return;

  }


  ownedPlayers.forEach(player => {

    const card =
      document.createElement("div");

    card.className = "player-card";


    card.innerHTML = `
      <div class="player-rating">
        ${getPlayerOvr(player)}
      </div>

      <div class="player-info">
        <h4>${player.name}</h4>
        <p>${player.club}</p>

        <span class="player-position">
          ${player.pos} • ${getRarity(player)}
          ${isPrime(player) ? " • PRIME" : ""}
        </span>
      </div>

      ${
        isPrime(player)
        ? `<div class="prime-rating">
             PRIME
           </div>`
        : `<button
             class="prime-btn"
             type="button"
           >
             PRIME
           </button>`
      }
    `;


    const primeButton =
      card.querySelector(".prime-btn");


    if (primeButton) {

      primeButton.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          makePrime(player);

        }
      );

    }


    card.addEventListener(
      "click",
      () => openPlayerModal(player)
    );


    container.appendChild(card);

  });

}


// ============================================================
// MATCHES
// ============================================================

const matchRewards = {

  Beginner: 50,

  Amateur: 75,

  "Semi-Pro": 100,

  Professional: 150,

  "World Class": 225,

  Legendary: 350

};


function playMatch(difficulty) {

  if (!difficulty) {
    return;
  }


  const reward =
    matchRewards[difficulty] || 50;


  // Simple match system.
  // Stronger clubs have better odds.

  const ownedPlayers =
    state.club
      .map(id =>
        players.find(
          player => player.id === id
        )
      )
      .filter(Boolean);


  let teamRating = 0;

  if (ownedPlayers.length > 0) {

    teamRating =
      ownedPlayers.reduce(
        (sum, player) =>
          sum + getPlayerOvr(player),
        0
      ) / ownedPlayers.length;

  }


  const difficultyRating = {

    Beginner: 65,

    Amateur: 72,

    "Semi-Pro": 78,

    Professional: 84,

    "World Class": 89,

    Legendary: 94

  }[difficulty] || 65;


  const baseChance = 0.5;

  const ratingDifference =
    (teamRating - difficultyRating) * 0.02;


  let winChance =
    baseChance + ratingDifference;


  winChance =
    Math.max(
      0.15,
      Math.min(0.85, winChance)
    );


  const won =
    Math.random() < winChance;


  const earned =
    won ? reward : Math.floor(reward * 0.25);


  state.coins += earned;


  state.matches.unshift({

    difficulty,

    result: won ? "WIN" : "LOSS",

    reward: earned,

    date: new Date().toLocaleDateString()

  });


  state.matches =
    state.matches.slice(0, 20);


  saveGame();

  updateAll();


  if (won) {

    notify(
      `WIN! You earned ${earned} coins.`
    );

  } else {

    notify(
      `Match lost. You earned ${earned} coins.`
    );

  }

}


// ============================================================
// MATCH HISTORY
// ============================================================

function renderMatchHistory() {

  const container =
    document.querySelector("#matchHistory");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  if (
    !state.matches ||
    state.matches.length === 0
  ) {

    container.innerHTML = `
      <div class="empty-choice">
        <span>🏆</span>
        <p>No matches played yet.</p>
      </div>
    `;

    return;

  }


  state.matches.forEach(match => {

    const item =
      document.createElement("div");

    item.className =
      "match-history-item";


    item.innerHTML = `
      <div>
        <strong>${match.difficulty}</strong>
        <br>
        <small>${match.date}</small>
      </div>

      <div>
        <strong>${match.result}</strong>
        <br>
        <small>+${match.reward} 🪙</small>
      </div>
    `;


    container.appendChild(item);

  });

}


// ============================================================
// PLAYER MODAL
// ============================================================

function openPlayerModal(player) {

  const modal =
    document.querySelector("#playerModal");

  const content =
    document.querySelector("#playerModalContent");


  if (!modal || !content) {
    return;
  }


  content.innerHTML = `

    <h2>${player.name}</h2>

    <p style="color:#969dab;margin:8px 0 20px;">
      ${player.club}
    </p>

    <div
      style="
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:10px;
      "
    >

      <div
        style="
          background:#181c27;
          padding:15px;
          border-radius:10px;
        "
      >
        <small>OVR</small>
        <br>
        <strong style="font-size:28px;">
          ${getPlayerOvr(player)}
        </strong>
      </div>

      <div
        style="
          background:#181c27;
          padding:15px;
          border-radius:10px;
        "
      >
        <small>POSITION</small>
        <br>
        <strong>
          ${player.pos}
        </strong>
      </div>

      <div
        style="
          background:#181c27;
          padding:15px;
          border-radius:10px;
        "
      >
        <small>RARITY</small>
        <br>
        <strong>
          ${getRarity(player)}
        </strong>
      </div>

      <div
        style="
          background:#181c27;
          padding:15px;
          border-radius:10px;
        "
      >
        <small>PRIME OVR</small>
        <br>
        <strong>
          ${player.primeOvr || player.ovr}
        </strong>
      </div>

    </div>

    ${
      isPrime(player)
      ? `
        <div
          style="
            margin-top:20px;
            padding:12px;
            background:rgba(255,212,71,.1);
            border:1px solid #ffd447;
            border-radius:9px;
            color:#ffd447;
            font-weight:900;
          "
        >
          👑 PRIME PLAYER
        </div>
      `
      : ""
    }

  `;


  modal.classList.remove("hidden");

}


function closePlayerModal() {

  const modal =
    document.querySelector("#playerModal");

  if (modal) {
    modal.classList.add("hidden");
  }

}


// ============================================================
// PAGE NAVIGATION
// ============================================================

function showPage(pageName) {

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(page => {

    page.classList.remove(
      "active-page"
    );

  });


  const target =
    document.getElementById(pageName);


  if (target) {

    target.classList.add(
      "active-page"
    );

  }


  const navButtons =
    document.querySelectorAll(".nav-btn");


  navButtons.forEach(button => {

    const targetPage =
      button.dataset.page ||
      button.getAttribute("data-target");


    if (targetPage === pageName) {

      button.classList.add("active");

    } else {

      button.classList.remove("active");

    }

  });


  if (pageName === "market") {
    renderMarket();
  }

  if (pageName === "club") {
    renderClub();
  }

  if (pageName === "matches") {
    renderMatchHistory();
  }

}


// ============================================================
// COIN UI
// ============================================================

function updateCoins() {

  const displays =
    document.querySelectorAll(
      "#coinCount, #coins, .coin-count"
    );


  displays.forEach(element => {

    element.textContent =
      state.coins.toLocaleString();

  });

}


// ============================================================
// NOTIFICATION
// ============================================================

let notificationTimer = null;


function notify(message) {

  const notification =
    document.querySelector("#notification");


  if (!notification) {

    console.log(message);

    return;

  }


  notification.textContent =
    message;


  notification.classList.add("show");


  clearTimeout(notificationTimer);


  notificationTimer =
    setTimeout(() => {

      notification.classList.remove(
        "show"
      );

    }, 2500);

}


// ============================================================
// UPDATE EVERYTHING
// ============================================================

function updateAll() {

  updateCoins();

  renderPitch();

  renderMarket();

  renderClub();

  renderMatchHistory();

}


// ============================================================
// NAVIGATION BUTTON SETUP
// ============================================================

function setupNavigation() {

  const buttons =
    document.querySelectorAll(".nav-btn");


  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const page =
          button.dataset.page ||
          button.dataset.target;


        if (page) {

          showPage(page);

        }

      }
    );

  });

}


// ============================================================
// FORMATION SELECT SETUP
// ============================================================

function setupFormationSelect() {

  const select =
    document.querySelector(
      "#formationSelect"
    );


  if (!select) {
    return;
  }


  select.value =
    state.formation;


  select.addEventListener(
    "change",
    () => {

      selectFormation(
        select.value
      );

    }
  );

}


// ============================================================
// BUTTON SETUP
// ============================================================

function setupButtons() {

  // Start draft buttons

  document
    .querySelectorAll(
      "[data-action='start-draft']"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        startNewDraft
      );

    });


  // Match buttons

  document
    .querySelectorAll(
      "[data-difficulty]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          playMatch(
            button.dataset.difficulty
          );

        }
      );

    });


  // Modal close

  document
    .querySelectorAll(
      ".modal-close"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        closePlayerModal
      );

    });

}


// ============================================================
// INITIALIZE
// ============================================================

function init() {

  loadGame();

  setupNavigation();

  setupFormationSelect();

  setupButtons();

  updateAll();

  showPage("home");

}


// ============================================================
// START APP
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  init
);
