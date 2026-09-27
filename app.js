const formations = [
  "4-3-3",
  "4-4-2",
  "4-2-3-1",
  "4-3-2-1",
  "4-2-2-2",
  "4-1-2-1-2",
  "4-1-3-2",
  "4-3-1-2",
  "4-4-1-1",
  "3-4-3",
  "3-4-1-2",
  "3-5-2",
  "3-4-2-1",
  "5-3-2",
  "5-2-3",
  "5-4-1",
  "5-2-1-2",
  "4-5-1",
  "4-2-4",
  "4-3-3 False 9",
  "2-3-5"
];

const players = [
  ["Erling Haaland", 91, "ST"],
  ["Kylian Mbappe", 91, "ST"],
  ["Vinicius Jr", 90, "LW"],
  ["Jude Bellingham", 90, "CM"],
  ["Rodri", 90, "CDM"],
  ["Mohamed Salah", 90, "RW"],
  ["Kevin De Bruyne", 89, "CM"],
  ["Harry Kane", 89, "ST"],
  ["Lamine Yamal", 89, "RW"],
  ["Virgil van Dijk", 89, "CB"],
  ["Alisson", 89, "GK"],
  ["Thibaut Courtois", 89, "GK"],
  ["Bukayo Saka", 88, "RW"],
  ["Son Heung-min", 88, "LW"],
  ["William Saliba", 88, "CB"],
  ["Federico Valverde", 88, "CM"],
  ["Bernardo Silva", 88, "CAM"],
  ["Martin Odegaard", 87, "CAM"],
  ["Achraf Hakimi", 87, "RB"],
  ["Theo Hernandez", 87, "LB"],
  ["Antonio Rudiger", 87, "CB"],
  ["Declan Rice", 87, "CDM"],
  ["Lautaro Martinez", 87, "ST"],
  ["Pedri", 86, "CM"],
  ["Phil Foden", 86, "CAM"],
  ["Ruben Dias", 86, "CB"],
  ["Mike Maignan", 86, "GK"],
  ["Trent Alexander-Arnold", 85, "RB"],
  ["Nuno Mendes", 85, "LB"],
  ["Victor Osimhen", 85, "ST"],
  ["Rafael Leao", 85, "LW"],
  ["Cole Palmer", 85, "CAM"],
  ["Gabriel", 84, "CB"],
  ["Enzo Fernandez", 84, "CM"],
  ["Ousmane Dembele", 84, "RW"],
  ["Bruno Fernandes", 84, "CAM"],
  ["Gianluigi Donnarumma", 84, "GK"],
  ["Mikel Merino", 82, "CM"],
  ["Gabriel Martinelli", 82, "LW"],
  ["Jonathan Tah", 82, "CB"],
  ["Benjamin Pavard", 81, "RB"],
  ["Diogo Costa", 81, "GK"],
  ["Nicolas Jackson", 80, "ST"],
  ["Conor Gallagher", 79, "CM"],
  ["Lisandro Martinez", 79, "CB"]
].map((p, i) => ({
  id: i + 1,
  name: p[0],
  ovr: p[1],
  pos: p[2]
}));

const reward = {
  Beginner: 50,
  Amateur: 75,
  "Semi-Pro": 100,
  Professional: 150,
  "World Class": 225,
  Legendary: 350
};

const difficultyPower = {
  Beginner: 55,
  Amateur: 65,
  "Semi-Pro": 72,
  Professional: 78,
  "World Class": 84,
  Legendary: 89
};

let selectedDiff = "Beginner";
let currentPos = null;

/*
  IMPORTANT:
  Every player displayed during a draft is added to this Set.
  That means even the two players you DON'T pick cannot appear again.
*/
let currentDraftPlayers = new Set();

const defaultState = () => ({
  coins: 1000,
  owned: [],
  drafts: 0,
  wins: 0,
  losses: 0,
  history: [],
  formation: null,
  squad: {}
});

/* =========================
   SAVE / LOAD
========================= */

function loadState() {
  try {
    const raw = localStorage.getItem("fcdraft_state");

    if (!raw) {
      return defaultState();
    }

    const saved = JSON.parse(raw);

    if (!saved || typeof saved !== "object") {
      return defaultState();
    }

    const base = defaultState();

    /*
      Supports both the new "owned" system
      and the older "club" system.
    */
    if (Array.isArray(saved.owned)) {
      base.owned = saved.owned
        .map(Number)
        .filter(Number.isFinite);
    } else if (Array.isArray(saved.club)) {
      base.owned = saved.club
        .map(Number)
        .filter(Number.isFinite);
    }

    if (Number.isFinite(saved.coins)) {
      base.coins = saved.coins;
    }

    if (Number.isFinite(saved.drafts)) {
      base.drafts = saved.drafts;
    }

    if (Number.isFinite(saved.wins)) {
      base.wins = saved.wins;
    }

    if (Number.isFinite(saved.losses)) {
      base.losses = saved.losses;
    }

    if (Array.isArray(saved.history)) {
      base.history = saved.history;
    }

    if (typeof saved.formation === "string") {
      base.formation = saved.formation;
    }

    if (saved.squad && typeof saved.squad === "object") {
      base.squad = saved.squad;
    }

    return base;

  } catch (error) {

    console.warn(
      "FCdraft save was invalid. Starting with a fresh save.",
      error
    );

    return defaultState();
  }
}

let state = loadState();

function save() {
  localStorage.setItem(
    "fcdraft_state",
    JSON.stringify(state)
  );

  updateHeader();
}

/* =========================
   HEADER
========================= */

function updateHeader() {

  const coins = document.querySelector("#coins");
  const homePlayers = document.querySelector("#homePlayers");
  const homeDrafts = document.querySelector("#homeDrafts");
  const homeWins = document.querySelector("#homeWins");
  const homeRating = document.querySelector("#homeRating");

  if (coins) {
    coins.textContent = state.coins.toLocaleString();
  }

  if (homePlayers) {
    homePlayers.textContent = state.owned.length;
  }

  if (homeDrafts) {
    homeDrafts.textContent = state.drafts;
  }

  if (homeWins) {
    homeWins.textContent = state.wins;
  }

  if (homeRating) {
    homeRating.textContent = clubRating() || 0;
  }
}

/* =========================
   PAGE NAVIGATION
========================= */

function showPage(id) {

  const page = document.querySelector("#" + id);

  if (!page) {
    console.warn("FCdraft: page not found:", id);
    return;
  }

  document
    .querySelectorAll(".page")
    .forEach(page => {
      page.classList.remove("active");
    });

  page.classList.add("active");

  document
    .querySelectorAll(".nav")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.page === id
      );
    });

  if (id === "market") {
    renderMarket();
  }

  if (id === "club") {
    renderClub();
  }

  if (id === "matches") {
    renderHistory();
  }

  updateHeader();
}

/* =========================
   RARITY
========================= */

function tier(ovr) {

  if (ovr >= 90) return "Very Rare";
  if (ovr === 89) return "Epic";
  if (ovr >= 85) return "Rare";
  if (ovr >= 75) return "Gold";
  if (ovr >= 65) return "Silver";

  return "Bronze";
}

/* =========================
   RANDOM SPAWN SYSTEM
========================= */

function spawnWeight(player) {

  const rating = player.ovr;

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

function weightedRandom(pool) {

  if (!pool.length) {
    return null;
  }

  const total = pool.reduce(
    (sum, player) => sum + spawnWeight(player),
    0
  );

  let roll = Math.random() * total;

  for (const player of pool) {

    roll -= spawnWeight(player);

    if (roll <= 0) {
      return player;
    }
  }

  return pool[pool.length - 1];
}

/* =========================
   POSITION COMPATIBILITY
========================= */

function compatiblePositions(slot) {

  const groups = {

    GK: ["GK"],

    DEF: [
      "CB",
      "LB",
      "RB",
      "LWB",
      "RWB"
    ],

    LWB: [
      "LB",
      "LWB"
    ],

    RWB: [
      "RB",
      "RWB"
    ],

    MID: [
      "CM",
      "CDM",
      "CAM",
      "LM",
      "RM"
    ],

    LM: [
      "LM",
      "LW",
      "CM"
    ],

    RM: [
      "RM",
      "RW",
      "CM"
    ],

    LW: [
      "LW",
      "LM",
      "ST",
      "RW"
    ],

    RW: [
      "RW",
      "RM",
      "LW",
      "ST"
    ],

    ST: [
      "ST",
      "CF"
    ],

    CF: [
      "CF",
      "ST",
      "CAM"
    ]
  };

  return groups[slot] || [slot];
}

/* =========================
   GET 3 UNIQUE PLAYERS
========================= */

function candidates(position) {

  const allowed = compatiblePositions(position);

  let pool = players.filter(player =>
    allowed.includes(player.pos) &&
    !currentDraftPlayers.has(player.id)
  );

  const choices = [];

  /*
    First try to get players who actually
    match the position.
  */
  while (
    choices.length < 3 &&
    pool.length
  ) {

    const player = weightedRandom(pool);

    if (!player) {
      break;
    }

    choices.push(player);

    /*
      IMPORTANT:
      Add EVERY displayed player immediately.
      Not just the player the user chooses.
    */
    currentDraftPlayers.add(player.id);

    pool = pool.filter(
      p => p.id !== player.id
    );
  }

  /*
    If there aren't 3 compatible players,
    fill the remaining choices with unused
    players from the whole database.
  */
  if (choices.length < 3) {

    let backup = players.filter(
      player => !currentDraftPlayers.has(player.id)
    );

    while (
      choices.length < 3 &&
      backup.length
    ) {

      const player = weightedRandom(backup);

      if (!player) {
        break;
      }

      choices.push(player);

      currentDraftPlayers.add(player.id);

      backup = backup.filter(
        p => p.id !== player.id
      );
    }
  }

  return choices;
}

/* =========================
   INITIALIZE
========================= */

function init() {

  const formationsEl =
    document.querySelector("#formations");

  if (formationsEl) {

    formationsEl.innerHTML =
      formations
        .map(
          formation => `
            <button
              class="formation"
              type="button"
              onclick="selectFormation('${formation.replace(/'/g, "\\'")}')"
            >
              <b>${formation}</b>
              <span>Balanced squad setup</span>
            </button>
          `
        )
        .join("");
  }

  /*
    Navigation buttons
  */
  document
    .querySelectorAll(".nav")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {
          showPage(button.dataset.page);
        }
      );

    });

  /*
    Difficulty buttons
  */
  document
    .querySelectorAll(".diff")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(".diff")
            .forEach(x => {
              x.classList.remove("active");
            });

          button.classList.add("active");

          selectedDiff =
            button.dataset.diff ||
            "Beginner";
        }
      );

    });

  updateHeader();

  renderHistory();
  renderMarket();
  renderClub();

  showPage("home");
}

/* =========================
   FORMATION
========================= */

function selectFormation(formation) {

  state.formation = formation;

  state.squad = {};

  currentPos = null;

  /*
    New draft = reset duplicate protection.
  */
  currentDraftPlayers = new Set();

  const picker =
    document.querySelector("#formationPicker");

  const draftArea =
    document.querySelector("#draftArea");

  const status =
    document.querySelector("#draftStatus");

  if (picker) {
    picker.classList.add("hidden");
  }

  if (draftArea) {
    draftArea.classList.remove("hidden");
  }

  if (status) {
    status.textContent = formation;
  }

  renderPitch();

  save();
}

/* =========================
   FORMATION POSITIONS
========================= */

function positionsFor(formation) {

  if (formation === "2-3-5") {

    return [
      ["GK", 50, 92],

      ["LB", 30, 77],
      ["CB", 50, 80],
      ["RB", 70, 77],

      ["LM", 28, 56],
      ["CM", 50, 57],
      ["RM", 72, 56],

      ["LW", 18, 27],
      ["ST", 50, 22],
      ["RW", 82, 27],

      ["CF", 50, 38]
    ];
  }

  /*
    Special handling for the weird
    "4-3-3 False 9" formation.
  */
  if (formation === "4-3-3 False 9") {

    return [
      ["GK", 50, 92],

      ["DEF", 24, 78],
      ["DEF", 50, 78],
      ["DEF", 76, 78],

      ["MID", 25, 55],
      ["MID", 50, 55],
      ["MID", 75, 55],

      ["LW", 20, 25],
      ["CF", 50, 35],
      ["RW", 80, 25]
    ];
  }

  const parts =
    formation
      .split("-")
      .map(Number);

  if (
    parts.length !== 3 ||
    parts.some(Number.isNaN)
  ) {

    return [
      ["GK", 50, 92],

      ["DEF", 30, 78],
      ["DEF", 50, 78],
      ["DEF", 70, 78],

      ["MID", 30, 55],
      ["MID", 50, 55],
      ["MID", 70, 55],

      ["LW", 20, 25],
      ["ST", 50, 22],
      ["RW", 80, 25]
    ];
  }

  const [
    defenders,
    midfielders,
    attackers
  ] = parts;

  const positions = [
    ["GK", 50, 92]
  ];

  let defendersX;

  if (defenders === 3) {

    defendersX = [
      30,
      50,
      70
    ];

  } else if (defenders === 5) {

    defendersX = [
      18,
      34,
      50,
      66,
      82
    ];

  } else {

    defendersX = [
      24,
      50,
      76
    ];
  }

  defendersX.forEach(
    (x, index) => {

      let type = "DEF";

      if (
        defenders === 5 &&
        index === 0
      ) {
        type = "LWB";
      }

      if (
        defenders === 5 &&
        index === defendersX.length - 1
      ) {
        type = "RWB";
      }

      positions.push([
        type,
        x,
        78
      ]);
    }
  );

  let midfieldX;

  if (midfielders === 5) {

    midfieldX = [
      15,
      33,
      50,
      67,
      85
    ];

  } else if (midfielders === 4) {

    midfieldX = [
      20,
      40,
      60,
      80
    ];

  } else if (midfielders === 3) {

    midfieldX = [
      25,
      50,
      75
    ];

  } else {

    midfieldX = [
      30,
      70
    ];
  }

  midfieldX.forEach(x => {

    positions.push([
      "MID",
      x,
      55
    ]);

  });

  let forwards;

  if (attackers === 1) {

    forwards = [
      ["ST", 50, 25]
    ];

  } else if (attackers === 2) {

    forwards = [
      ["LW", 35, 25],
      ["ST", 65, 25]
    ];

  } else {

    forwards = [
      ["LW", 20, 25],
      ["ST", 50, 22],
      ["RW", 80, 25]
    ];
  }

  return positions.concat(forwards);
}

/* =========================
   RENDER PITCH
========================= */

function renderPitch() {

  const pitch =
    document.querySelector("#pitch");

  if (!pitch || !state.formation) {
    return;
  }

  const positions =
    positionsFor(state.formation);

  pitch.innerHTML =
    positions
      .map((position, index) => {

        const [
          type,
          x,
          y
        ] = position;

        const key =
          type + index;

        const playerId =
          state.squad[key];

        const player =
          playerId
            ? players.find(
                p =>
                  p.id === Number(playerId)
              )
            : null;

        return `
          <button
            class="slot ${player ? "filled" : ""}"
            type="button"
            style="left:${x}%;top:${y}%"
            onclick="choosePos('${key}','${type}')"
          >
            ${
              player
                ? player.name.split(" ").pop()
                : "+"
            }

            <small>${type}</small>
          </button>
        `;
      })
      .join("");
}

/* =========================
   CHOOSE POSITION
========================= */

function choosePos(key, position) {

  currentPos = key;

  const title =
    document.querySelector(
      "#choicePosition"
    );

  const list =
    document.querySelector(
      "#choiceList"
    );

  if (title) {
    title.textContent =
      `Choose ${position}`;
  }

  if (!list) {
    return;
  }

  const choices =
    candidates(position);

  list.innerHTML =
    choices
      .map(
        player => `
          <button
            class="choice"
            type="button"
            onclick="pick(${player.id})"
          >

            <div class="avatar">
              ${player.ovr}
            </div>

            <div class="info">
              <b>${player.name}</b>
              <span>
                ${player.pos} · ${tier(player.ovr)}
              </span>
            </div>

            <div class="ovr">
              ${player.ovr}
            </div>

          </button>
        `
      )
      .join("");
}

/* =========================
   PICK PLAYER
========================= */

function pick(id) {

  if (!currentPos || !state.formation) {
    return;
  }

  const player =
    players.find(
      p => p.id === Number(id)
    );

  if (!player) {
    return;
  }

  state.squad[currentPos] =
    Number(id);

  save();

  renderPitch();

  const list =
    document.querySelector(
      "#choiceList"
    );

  if (list) {

    list.innerHTML = `
      <div class="empty">
        Player selected.
        Choose another position.
      </div>
    `;
  }

  /*
    Check whether every position
    in the formation has a player.
  */
  const required =
    positionsFor(state.formation).length;

  const filled =
    Object.keys(state.squad).length;

  if (filled >= required) {

    state.drafts++;

    state.owned = [
      ...new Set([
        ...state.owned,
        ...Object.values(state.squad)
          .map(Number)
      ])
    ];

    save();

    if (list) {

      list.innerHTML = `
        <div class="empty">
          <b>Draft complete!</b>
          <br>
          Your squad is ready for a match.
        </div>

        <button
          class="primary wide"
          type="button"
          onclick="showPage('matches')"
        >
          Play Match →
        </button>
      `;
    }
  }
}

/* =========================
   RESET DRAFT
========================= */

function resetDraft() {

  state.formation = null;
  state.squad = {};

  currentPos = null;

  currentDraftPlayers =
    new Set();

  save();

  const picker =
    document.querySelector(
      "#formationPicker"
    );

  const draftArea =
    document.querySelector(
      "#draftArea"
    );

  const status =
    document.querySelector(
      "#draftStatus"
    );

  if (picker) {
    picker.classList.remove("hidden");
  }

  if (draftArea) {
    draftArea.classList.add("hidden");
  }

  if (status) {
    status.textContent = "";
  }

  const list =
    document.querySelector(
      "#choiceList"
    );

  if (list) {

    list.innerHTML = `
      <div class="empty">
        Click a position on the pitch
        to see 3 players.
      </div>
    `;
  }
}

/* =========================
   CLUB RATING
========================= */

function clubRating() {

  const ids =
    Object.values(state.squad)
      .map(Number)
      .filter(Boolean);

  if (!ids.length) {

    if (!state.owned.length) {
      return 0;
    }

    const total =
      state.owned.reduce(
        (sum, id) => {

          const player =
            players.find(
              p => p.id === Number(id)
            );

          return sum +
            (player ? player.ovr : 0);
        },
        0
      );

    return Math.round(
      total / state.owned.length
    );
  }

  const total =
    ids.reduce(
      (sum, id) => {

        const player =
          players.find(
            p => p.id === id
          );

        return sum +
          (player ? player.ovr : 0);
      },
      0
    );

  return Math.round(
    total / ids.length
  );
}

/* =========================
   PLAYER CARD
========================= */

function card(player, market = false) {

  if (!player) {
    return "";
  }

  const owned =
    state.owned.includes(player.id);

  const price =
    Math.max(
      100,
      (player.ovr - 60) * 35
    );

  return `
    <div class="player-card">

      <div class="player-top">
        <span class="tier">
          ${tier(player.ovr)}
        </span>

        <b>${player.ovr}</b>
      </div>

      <div class="player-name">
        ${player.name}
      </div>

      <div class="muted">
        ${player.pos} · OVR ${player.ovr}
      </div>

      ${
        market
          ? `
            <button
              class="buy"
              type="button"
              ${
                owned ||
                state.coins < price
                  ? "disabled"
                  : ""
              }
              onclick="buy(${player.id})"
            >
              ${
                owned
                  ? "Owned"
                  : "Buy · 🪙 " + price
              }
            </button>
          `
          : ""
      }

    </div>
  `;
}

/* =========================
   MARKET
========================= */

function renderMarket() {

  const market =
    document.querySelector(
      "#marketGrid"
    );

  if (!market) {
    return;
  }

  market.innerHTML =
    players
      .map(player =>
        card(player, true)
      )
      .join("");
}

function buy(id) {

  const player =
    players.find(
      p => p.id === Number(id)
    );

  if (!player) {
    return;
  }

  const price =
    Math.max(
      100,
      (player.ovr - 60) * 35
    );

  if (
    state.owned.includes(player.id)
  ) {
    return;
  }

  if (state.coins < price) {
    return;
  }

  state.coins -= price;

  state.owned.push(
    player.id
  );

  save();

  renderMarket();
  renderClub();
}

/* =========================
   MY CLUB
========================= */

function renderClub() {

  const club =
    document.querySelector(
      "#clubGrid"
    );

  if (!club) {
    return;
  }

  if (!state.owned.length) {

    club.innerHTML = `
      <div class="panel">
        No players yet.
        Complete a draft or visit the market.
      </div>
    `;

    return;
  }

  club.innerHTML =
    state.owned
      .map(id => {

        const player =
          players.find(
            p => p.id === Number(id)
          );

        return card(player);
      })
      .join("");
}

/* =========================
   MATCHES
========================= */

function playMatch() {

  const result =
    document.querySelector(
      "#matchResult"
    );

  if (!Object.keys(state.squad).length) {

    if (result) {

      result.innerHTML = `
        <div class="result">
          Complete a draft first.
        </div>
      `;
    }

    return;
  }

  const rating =
    clubRating();

  const power =
    difficultyPower[selectedDiff] ||
    difficultyPower.Beginner;

  const yourScore =
    Math.max(
      1,
      Math.round(
        rating +
        Math.random() * 14 -
        power * 0.25
      )
    );

  const opponentScore =
    Math.max(
      0,
      Math.round(
        power +
        Math.random() * 13
      )
    );

  const win =
    yourScore >= opponentScore;

  const coinsWon =
    win
      ? reward[selectedDiff]
      : 0;

  if (win) {

    state.wins++;

    state.coins +=
      coinsWon;

  } else {

    state.losses++;
  }

  state.history.unshift({
    diff: selectedDiff,
    your: yourScore,
    opp: opponentScore,
    win: win,
    coins: coinsWon
  });

  state.history =
    state.history.slice(0, 10);

  save();

  if (result) {

    result.innerHTML = `
      <div class="result">

        <div>
          ${
            win
              ? "🏆 YOU WIN"
              : "MATCH RESULT"
          }
        </div>

        <div class="score">
          ${yourScore} - ${opponentScore}
        </div>

        <div
          class="${win ? "win" : "loss"}"
        >
          ${
            win
              ? "+" + coinsWon + " coins"
              : "Defeat — try again"
          }
        </div>

      </div>
    `;
  }

  renderHistory();
}

/* =========================
   MATCH HISTORY
========================= */

function renderHistory() {

  const history =
    document.querySelector(
      "#historyList"
    );

  if (!history) {
    return;
  }

  if (!state.history.length) {

    history.innerHTML = `
      <div class="muted">
        No matches played yet.
      </div>
    `;

    return;
  }

  history.innerHTML =
    state.history
      .map(
        match => `
          <div class="history-row">

            <span>
              ${match.diff}
            </span>

            <b
              class="${match.win ? "win" : "loss"}"
            >
              ${match.your}-${match.opp}
            </b>

            <span>
              ${
                match.win
                  ? "+" + match.coins
                  : "—"
              }
            </span>

          </div>
        `
      )
      .join("");
}

/* =========================
   MAKE INLINE HTML WORK
========================= */

window.showPage =
  showPage;

window.selectFormation =
  selectFormation;

window.choosePos =
  choosePos;

window.pick =
  pick;

window.resetDraft =
  resetDraft;

window.buy =
  buy;

window.playMatch =
  playMatch;

/* =========================
   START APP
========================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();
}
