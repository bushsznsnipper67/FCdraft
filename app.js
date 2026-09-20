// ============================================================
// FCdraft - Main Game JavaScript
// Includes PRIME PLAYER upgrade system
// ============================================================

const PRIME_COST = 1000;

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

// ------------------------------------------------------------
// PLAYER DATA
// primeOvr = highest verified rating across the historical
// FIFA/FC period you choose to use.
// ------------------------------------------------------------

const players = [
  ["Erling Haaland",91,"ST",91],
  ["Kylian Mbappe",91,"ST",92],
  ["Vinicius Jr",90,"LW",90],
  ["Jude Bellingham",90,"CM",90],
  ["Rodri",90,"CDM",91],
  ["Mohamed Salah",90,"RW",90],
  ["Kevin De Bruyne",89,"CM",91],
  ["Harry Kane",89,"ST",91],
  ["Lamine Yamal",89,"RW",89],
  ["Virgil van Dijk",89,"CB",90],
  ["Alisson",89,"GK",90],
  ["Thibaut Courtois",89,"GK",90],
  ["Bukayo Saka",88,"RW",88],
  ["Son Heung-min",88,"LW",90],
  ["William Saliba",88,"CB",88],
  ["Federico Valverde",88,"CM",89],
  ["Bernardo Silva",88,"CAM",90],
  ["Martin Odegaard",87,"CAM",89],
  ["Achraf Hakimi",87,"RB",87],
  ["Theo Hernandez",87,"LB",87],
  ["Antonio Rudiger",87,"CB",88],
  ["Declan Rice",87,"CDM",87],
  ["Lautaro Martinez",87,"ST",88],
  ["Pedri",86,"CM",86],
  ["Phil Foden",86,"CAM",88],
  ["Ruben Dias",86,"CB",88],
  ["Mike Maignan",86,"GK",87],
  ["Trent Alexander-Arnold",85,"RB",87],
  ["Nuno Mendes",85,"LB",86],
  ["Victor Osimhen",85,"ST",89],
  ["Rafael Leao",85,"LW",86],
  ["Cole Palmer",85,"CAM",85],
  ["Gabriel",84,"CB",86],
  ["Enzo Fernandez",84,"CM",84],
  ["Ousmane Dembele",84,"RW",86],
  ["Bruno Fernandes",84,"CAM",88],
  ["Gianluigi Donnarumma",84,"GK",89],
  ["Mikel Merino",82,"CM",85],
  ["Gabriel Martinelli",82,"LW",84],
  ["Jonathan Tah",82,"CB",86],
  ["Benjamin Pavard",81,"RB",85],
  ["Diogo Costa",81,"GK",85],
  ["Nicolas Jackson",80,"ST",82],
  ["Conor Gallagher",79,"CM",81],
  ["Lisandro Martinez",79,"CB",84]
].map((p, i) => ({
  id: i + 1,
  name: p[0],
  ovr: p[1],
  pos: p[2],
  primeOvr: p[3]
}));

// ------------------------------------------------------------
// MATCH REWARDS
// ------------------------------------------------------------

const rewards = {
  "Beginner": 50,
  "Amateur": 75,
  "Semi-Pro": 100,
  "Professional": 150,
  "World Class": 225,
  "Legendary": 350
};

const difficultyPower = {
  "Beginner": 55,
  "Amateur": 65,
  "Semi-Pro": 72,
  "Professional": 78,
  "World Class": 84,
  "Legendary": 89
};

// ------------------------------------------------------------
// SAVE DATA
// ------------------------------------------------------------

let state;

try {
  state = JSON.parse(localStorage.getItem("fcdraft_state"));
} catch {
  state = null;
}

if (!state || typeof state !== "object") {
  state = {
    coins: 1000,
    owned: [],
    drafts: 0,
    wins: 0,
    losses: 0,
    history: [],
    formation: null,
    squad: {},
    primes: []
  };
}

state.coins = Number.isFinite(Number(state.coins))
  ? Number(state.coins)
  : 1000;

state.owned = Array.isArray(state.owned)
  ? state.owned
  : [];

state.history = Array.isArray(state.history)
  ? state.history
  : [];

state.squad =
  state.squad && typeof state.squad === "object"
    ? state.squad
    : {};

state.primes = Array.isArray(state.primes)
  ? state.primes
  : [];

let selectedDiff = "Beginner";
let currentPos = null;

// ------------------------------------------------------------
// SAVE
// ------------------------------------------------------------

function save() {
  localStorage.setItem(
    "fcdraft_state",
    JSON.stringify(state)
  );

  updateHeader();
}

// ------------------------------------------------------------
// PLAYER HELPERS
// ------------------------------------------------------------

function getPlayer(id) {
  return players.find(
    player => player.id === Number(id)
  );
}

function isPrime(id) {
  return state.primes.includes(Number(id));
}

function getPlayerOvr(player) {
  if (!player) return 0;

  return isPrime(player.id)
    ? player.primeOvr
    : player.ovr;
}

function tier(ovr) {
  if (ovr >= 90) return "Very Rare";
  if (ovr === 89) return "Epic";
  if (ovr >= 85) return "Rare";
  if (ovr >= 75) return "Gold";
  if (ovr >= 65) return "Silver";
  return "Bronze";
}

// ------------------------------------------------------------
// HEADER
// ------------------------------------------------------------

function updateHeader() {
  const coins = document.querySelector("#coins");
  const homePlayers = document.querySelector("#homePlayers");
  const homeDrafts = document.querySelector("#homeDrafts");
  const homeWins = document.querySelector("#homeWins");
  const homeRating = document.querySelector("#homeRating");

  if (coins) {
    coins.textContent =
      Math.max(0, state.coins).toLocaleString();
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
    homeRating.textContent = clubRating();
  }
}

// ------------------------------------------------------------
// NAVIGATION
// ------------------------------------------------------------

function showPage(id) {
  const page = document.querySelector("#" + id);

  if (!page) return;

  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  page.classList.add("active");

  document.querySelectorAll(".nav").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === id
    );
  });

  if (id === "market") renderMarket();
  if (id === "club") renderClub();
  if (id === "matches") renderHistory();

  updateHeader();
}

window.showPage = showPage;

// ------------------------------------------------------------
// POSITION COMPATIBILITY
// ------------------------------------------------------------

function compatiblePositions(position) {
  const groups = {
    GK: ["GK"],
    DEF: ["CB", "LB", "RB"],
    MID: ["CM", "CDM", "CAM"],
    LWB: ["LB"],
    RWB: ["RB"],
    LB: ["LB"],
    RB: ["RB"],
    CB: ["CB"],
    CM: ["CM", "CDM", "CAM"],
    CDM: ["CDM", "CM"],
    CAM: ["CAM", "CM"],
    LW: ["LW"],
    RW: ["RW"],
    ST: ["ST"],
    CF: ["ST", "CAM"]
  };

  return groups[position] || [position];
}

function candidates(position) {
  const allowed = compatiblePositions(position);

  let pool = players.filter(player =>
    allowed.includes(player.pos)
  );

  const unused = pool.filter(player =>
    !Object.values(state.squad)
      .map(Number)
      .includes(player.id)
  );

  if (unused.length >= 3) {
    pool = unused;
  }

  pool = pool.sort(() => Math.random() - 0.5);

  if (pool.length < 3) {
    const extra = players.filter(
      player =>
        !pool.some(
          existing => existing.id === player.id
        )
    );

    pool = [
      ...pool,
      ...extra.sort(() => Math.random() - 0.5)
    ];
  }

  return pool.slice(0, 3);
}

// ------------------------------------------------------------
// INITIALIZE
// ------------------------------------------------------------

function init() {
  const formationsElement =
    document.querySelector("#formations");

  if (formationsElement) {
    formationsElement.innerHTML =
      formations.map((formation, index) => `
        <button
          class="formation"
          data-formation="${index}"
        >
          <b>${formation}</b>
          <span>Balanced squad setup</span>
        </button>
      `).join("");

    formationsElement
      .querySelectorAll(".formation")
      .forEach(button => {
        button.addEventListener("click", () => {
          const index =
            Number(button.dataset.formation);

          selectFormation(formations[index]);
        });
      });
  }

  document.querySelectorAll(".nav")
    .forEach(button => {
      button.addEventListener("click", () => {
        showPage(button.dataset.page);
      });
    });

  document.querySelectorAll(".diff")
    .forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".diff")
          .forEach(x =>
            x.classList.remove("active")
          );

        button.classList.add("active");

        selectedDiff =
          button.dataset.diff;
      });
    });

  updateHeader();
  renderHistory();

  if (state.formation) {
    renderPitch();
  }
}

// ------------------------------------------------------------
// FORMATION
// ------------------------------------------------------------

function selectFormation(formation) {
  state.formation = formation;
  state.squad = {};
  currentPos = null;

  const picker =
    document.querySelector("#formationPicker");

  const draftArea =
    document.querySelector("#draftArea");

  const status =
    document.querySelector("#draftStatus");

  if (picker) picker.classList.add("hidden");

  if (draftArea) draftArea.classList.remove("hidden");

  if (status) status.textContent = formation;

  save();
  renderPitch();

  const choiceList =
    document.querySelector("#choiceList");

  if (choiceList) {
    choiceList.innerHTML =
      '<div class="empty">Click a position on the pitch to see 3 players.</div>';
  }
}

window.selectFormation = selectFormation;

// ------------------------------------------------------------
// FORMATION POSITIONS
// ------------------------------------------------------------

function positionsFor(formation) {
  if (formation === "2-3-5") {
    return [
      ["GK", 50, 92],
      ["DEF", 30, 78],
      ["CB", 50, 80],
      ["DEF", 70, 78],
      ["MID", 25, 55],
      ["CM", 50, 57],
      ["MID", 75, 55],
      ["LW", 18, 27],
      ["ST", 50, 22],
      ["RW", 82, 27],
      ["CF", 50, 38]
    ];
  }

  const parts =
    formation.split("-").map(Number);

  const defenders = parts[0] || 4;
  const midfielders = parts[1] || 3;
  const attackers = parts[2] || 3;

  const positions = [
    ["GK", 50, 92]
  ];

  let defenderX;

  if (defenders === 3) {
    defenderX = [30, 50, 70];
  } else if (defenders === 5) {
    defenderX = [15, 32, 50, 68, 85];
  } else {
    defenderX = [24, 50, 76];
  }

  defenderX.forEach((x, index) => {
    let position = "DEF";

    if (
      defenders === 5 &&
      index === 0
    ) {
      position = "LWB";
    }

    if (
      defenders === 5 &&
      index === defenderX.length - 1
    ) {
      position = "RWB";
    }

    positions.push([
      position,
      x,
      78
    ]);
  });

  let midfieldX;

  if (midfielders === 5) {
    midfieldX = [15, 33, 50, 67, 85];
  } else if (midfielders === 4) {
    midfieldX = [20, 40, 60, 80];
  } else if (midfielders === 3) {
    midfieldX = [25, 50, 75];
  } else {
    midfieldX = [30, 70];
  }

  midfieldX.forEach(x => {
    positions.push([
      "MID",
      x,
      55
    ]);
  });

  if (attackers === 1) {
    positions.push([
      "ST",
      50,
      25
    ]);
  } else if (attackers === 2) {
    positions.push([
      "LW",
      35,
      25
    ]);

    positions.push([
      "ST",
      65,
      25
    ]);
  } else {
    positions.push([
      "LW",
      20,
      25
    ]);

    positions.push([
      "ST",
      50,
      22
    ]);

    positions.push([
      "RW",
      80,
      25
    ]);
  }

  return positions;
}

// ------------------------------------------------------------
// PITCH
// ------------------------------------------------------------

function renderPitch() {
  const pitch =
    document.querySelector("#pitch");

  if (!pitch || !state.formation) return;

  const positions =
    positionsFor(state.formation);

  pitch.innerHTML =
    positions.map((position, index) => {
      const type = position[0];
      const key = type + index;

      const playerId =
        state.squad[key];

      const player =
        playerId
          ? getPlayer(playerId)
          : null;

      const rating =
        player
          ? getPlayerOvr(player)
          : "";

      return `
        <button
          class="slot ${player ? "filled" : ""}"
          style="
            left:${position[1]}%;
            top:${position[2]}%
          "
          data-key="${key}"
          data-position="${type}"
        >
          ${
            player
              ? player.name.split(" ").pop()
              : "+"
          }

          <small>
            ${
              player
                ? `${player.pos} ${rating}`
                : type
            }
          </small>
        </button>
      `;
    }).join("");

  pitch
    .querySelectorAll(".slot")
    .forEach(button => {
      button.addEventListener("click", () => {
        choosePos(
          button.dataset.key,
          button.dataset.position
        );
      });
    });
}

// ------------------------------------------------------------
// PLAYER CHOICE
// ------------------------------------------------------------

function choosePos(key, position) {
  currentPos = key;

  const choicePosition =
    document.querySelector("#choicePosition");

  const choiceList =
    document.querySelector("#choiceList");

  if (choicePosition) {
    choicePosition.textContent =
      `Choose ${position}`;
  }

  if (!choiceList) return;

  const list =
    candidates(position);

  choiceList.innerHTML =
    list.map(player => {
      const rating =
        getPlayerOvr(player);

      return `
        <button
          class="choice"
          data-player-id="${player.id}"
        >
          <div class="avatar">
            ${rating}
          </div>

          <div class="info">
            <b>${player.name}</b>
            <span>
              ${player.pos} · ${tier(rating)}
            </span>
          </div>

          <div class="ovr">
            ${rating}
          </div>
        </button>
      `;
    }).join("");

  choiceList
    .querySelectorAll(".choice")
    .forEach(button => {
      button.addEventListener("click", () => {
        pick(
          Number(button.dataset.playerId)
        );
      });
    });
}

window.choosePos = choosePos;

// ------------------------------------------------------------
// PICK PLAYER
// ------------------------------------------------------------

function pick(id) {
  if (!currentPos) return;

  const player =
    getPlayer(id);

  if (!player) return;

  const alreadyUsed =
    Object.entries(state.squad)
      .some(([key, playerId]) =>
        key !== currentPos &&
        Number(playerId) === player.id
      );

  if (alreadyUsed) {
    alert(
      "That player is already in your squad."
    );

    return;
  }

  state.squad[currentPos] =
    player.id;

  save();

  renderPitch();

  const choiceList =
    document.querySelector("#choiceList");

  if (choiceList) {
    choiceList.innerHTML =
      '<div class="empty">Player selected. Choose another position.</div>';
  }

  const totalPositions =
    positionsFor(
      state.formation
    ).length;

  if (
    Object.keys(state.squad).length >=
    totalPositions
  ) {
    state.drafts++;

    state.owned = [
      ...new Set([
        ...state.owned,
        ...Object.values(state.squad)
          .map(Number)
      ])
    ];

    save();

    if (choiceList) {
      choiceList.innerHTML = `
        <div class="empty">
          <b>Draft complete!</b><br>
          Your squad is ready for a match.
        </div>

        <button
          class="primary wide"
          id="playAfterDraft"
        >
          Play Match →
        </button>
      `;

      document
        .querySelector("#playAfterDraft")
        ?.addEventListener(
          "click",
          () => showPage("matches")
        );
    }
  }
}

window.pick = pick;

// ------------------------------------------------------------
// RESET DRAFT
// ------------------------------------------------------------

function resetDraft() {
  state.formation = null;
  state.squad = {};
  currentPos = null;

  const picker =
    document.querySelector("#formationPicker");

  const draftArea =
    document.querySelector("#draftArea");

  const status =
    document.querySelector("#draftStatus");

  const choiceList =
    document.querySelector("#choiceList");

  if (picker)
    picker.classList.remove("hidden");

  if (draftArea)
    draftArea.classList.add("hidden");

  if (status)
    status.textContent = "";

  if (choiceList) {
    choiceList.innerHTML =
      '<div class="empty">Click a position on the pitch to see 3 players.</div>';
  }

  save();
}

window.resetDraft = resetDraft;

// ------------------------------------------------------------
// CLUB RATING
// ------------------------------------------------------------

function clubRating() {
  const ids =
    Object.values(state.squad)
      .map(Number)
      .filter(Boolean);

  if (ids.length) {
    const ratings =
      ids
        .map(id => {
          const player =
            getPlayer(id);

          return player
            ? getPlayerOvr(player)
            : 0;
        })
        .filter(Boolean);

    if (ratings.length) {
      return Math.round(
        ratings.reduce(
          (sum, rating) =>
            sum + rating,
          0
        ) / ratings.length
      );
    }
  }

  return 0;
}

// ------------------------------------------------------------
// MARKET PRICE
// ------------------------------------------------------------

function playerPrice(player) {
  const rating =
    getPlayerOvr(player);

  return Math.max(
    100,
    (rating - 60) * 35
  );
}

// ------------------------------------------------------------
// PLAYER CARD
// ------------------------------------------------------------

function card(player, market = false) {
  if (!player) return "";

  const owned =
    state.owned.includes(player.id);

  const prime =
    isPrime(player.id);

  const rating =
    getPlayerOvr(player);

  const price =
    playerPrice(player);

  return `
    <div class="player-card">

      <div class="player-top">
        <span class="tier">
          ${prime ? "PRIME" : tier(rating)}
        </span>

        <b>${rating}</b>
      </div>

      <div class="player-name">
        ${player.name}
      </div>

      <div class="muted">
        ${player.pos} · OVR ${rating}
      </div>

      ${
        market
          ? `
            <button
              class="buy"
              data-buy-id="${player.id}"
              ${owned || state.coins < price
                ? "disabled"
                : ""}
            >
              ${
                owned
                  ? "Owned"
                  : `Buy · 🪙 ${price}`
              }
            </button>
          `
          : ""
      }

      ${
        owned && !prime
          ? `
            <button
              class="prime-button"
              data-prime-id="${player.id}"
              ${state.coins < PRIME_COST
                ? "disabled"
                : ""}
            >
              ⭐ PRIME · 🪙 ${PRIME_COST}
            </button>
          `
          : ""
      }

      ${
        prime
          ? `
            <div class="prime-active">
              ⭐ PRIME PLAYER
            </div>
          `
          : ""
      }

    </div>
  `;
}

// ------------------------------------------------------------
// MARKET
// ------------------------------------------------------------

function renderMarket() {
  const grid =
    document.querySelector("#marketGrid");

  if (!grid) return;

  grid.innerHTML =
    players
      .map(player =>
        card(player, true)
      )
      .join("");

  grid
    .querySelectorAll("[data-buy-id]")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          buy(
            Number(
              button.dataset.buyId
            )
          );
        }
      );
    });

  grid
    .querySelectorAll("[data-prime-id]")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          activatePrime(
            Number(
              button.dataset.primeId
            )
          );
        }
      );
    });
}

// ------------------------------------------------------------
// BUY PLAYER
// ------------------------------------------------------------

function buy(id) {
  const player =
    getPlayer(id);

  if (!player) return;

  if (
    state.owned.includes(
      player.id
    )
  ) {
    return;
  }

  const price =
    playerPrice(player);

  if (state.coins < price) {
    alert(
      "You don't have enough coins."
    );

    return;
  }

  state.coins -= price;

  state.owned.push(
    player.id
  );

  state.owned =
    [...new Set(state.owned)];

  save();

  renderMarket();
  renderClub();
}

window.buy = buy;

// ============================================================
// PRIME SYSTEM
// ============================================================

function activatePrime(id) {
  const player =
    getPlayer(id);

  if (!player) return;

  if (
    !state.owned.includes(
      player.id
    )
  ) {
    alert(
      "You must own this player before making them Prime."
    );

    return;
  }

  if (isPrime(player.id)) {
    alert(
      "This player is already Prime."
    );

    return;
  }

  if (
    state.coins < PRIME_COST
  ) {
    alert(
      `You need ${PRIME_COST.toLocaleString()} coins to activate Prime.`
    );

    return;
  }

  const confirmed =
    confirm(
      `Make ${player.name} PRIME for ${PRIME_COST.toLocaleString()} coins?\n\n` +
      `Current OVR: ${player.ovr}\n` +
      `Prime OVR: ${player.primeOvr}`
    );

  if (!confirmed) return;

  state.coins -= PRIME_COST;

  state.primes.push(
    player.id
  );

  state.primes =
    [...new Set(state.primes)];

  save();

  // Update player wherever they are currently displayed
  renderMarket();
  renderClub();
  renderPitch();

  alert(
    `${player.name} is now PRIME! OVR ${player.primeOvr}`
  );
}

window.activatePrime =
  activatePrime;

// ------------------------------------------------------------
// MY CLUB
// ------------------------------------------------------------

function renderClub() {
  const grid =
    document.querySelector("#clubGrid");

  if (!grid) return;

  if (!state.owned.length) {
    grid.innerHTML = `
      <div class="panel">
        No players yet.
        Complete a draft or visit the market.
      </div>
    `;

    return;
  }

  grid.innerHTML =
    state.owned
      .map(id =>
        card(
          getPlayer(id)
        )
      )
      .join("");

  grid
    .querySelectorAll("[data-prime-id]")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          activatePrime(
            Number(
              button.dataset.primeId
            )
          );
        }
      );
    });
}

// ------------------------------------------------------------
// MATCHES
// ------------------------------------------------------------

function playMatch() {
  const result =
    document.querySelector(
      "#matchResult"
    );

  if (
    !Object.keys(state.squad).length
  ) {
    if (result) {
      result.innerHTML =
        '<div class="result">Complete a draft first.</div>';
    }

    return;
  }

  const rating =
    clubRating();

  const power =
    difficultyPower[
      selectedDiff
    ] || 55;

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

  const earned =
    win
      ? rewards[selectedDiff]
      : 0;

  if (win) {
    state.wins++;
    state.coins += earned;
  } else {
    state.losses++;
  }

  state.history.unshift({
    diff: selectedDiff,
    your: yourScore,
    opp: opponentScore,
    win,
    coins: earned
  });

  state.history =
    state.history.slice(0, 10);

  save();

  if (result) {
    result.innerHTML = `
      <div class="result">

        <div>
          ${win ? "🏆 YOU WIN" : "MATCH RESULT"}
        </div>

        <div class="score">
          ${yourScore} - ${opponentScore}
        </div>

        <div class="${win ? "win" : "loss"}">
          ${
            win
              ? "+" +
                earned +
                " coins"
              : "Defeat — try again"
          }
        </div>

      </div>
    `;
  }

  renderHistory();
}

window.playMatch =
  playMatch;

// ------------------------------------------------------------
// MATCH HISTORY
// ------------------------------------------------------------

function renderHistory() {
  const historyList =
    document.querySelector(
      "#historyList"
    );

  if (!historyList) return;

  if (!state.history.length) {
    historyList.innerHTML =
      '<div class="muted">No matches played yet.</div>';

    return;
  }

  historyList.innerHTML =
    state.history
      .map(match => `
        <div class="history-row">

          <span>
            ${match.diff}
          </span>

          <b class="${
            match.win
              ? "win"
              : "loss"
          }">
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
      `)
      .join("");
}

// ------------------------------------------------------------
// START
// ------------------------------------------------------------

document.addEventListener(
  "DOMContentLoaded",
  () => {

    init();

    if (state.formation) {

      const picker =
        document.querySelector(
          "#formationPicker"
        );

      const draftArea =
        document.querySelector(
          "#draftArea"
        );

      if (picker)
        picker.classList.add(
          "hidden"
        );

      if (draftArea)
        draftArea.classList.remove(
          "hidden"
        );

      renderPitch();
    }
  }
);
