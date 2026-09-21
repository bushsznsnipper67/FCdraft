// ============================================================
// FCdraft RANDOM PLAYER SPAWN SYSTEM
// ============================================================

// Players that have already appeared ANYWHERE in this draft.
// A player in this Set can NEVER appear again until a new draft.
let currentDraftPlayers = new Set();

// Players currently displayed in the 3-choice screen.
let currentChoicePlayers = new Set();


// ============================================================
// RANDOM SPAWN WEIGHT
// ============================================================
// Every player has a chance to spawn.
// Higher rated = rarer
// Lower rated = more common
// ============================================================

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


// ============================================================
// WEIGHTED RANDOM PLAYER
// ============================================================

function weightedRandomPlayer(pool) {

  if (!pool || pool.length === 0) {
    return null;
  }

  let totalWeight = 0;

  for (const player of pool) {
    totalWeight += playerSpawnWeight(player);
  }

  if (totalWeight <= 0) {
    return pool[Math.floor(Math.random() * pool.length)];
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
// GET 3 UNIQUE PLAYER CHOICES
// ============================================================

function candidates(position) {

  const allowed = compatiblePositions(position);

  // ----------------------------------------------------------
  // STEP 1:
  // Get players who can play this position.
  // ----------------------------------------------------------

  let pool = players.filter(player => {

    return (
      allowed.includes(player.pos) &&
      !currentDraftPlayers.has(player.id) &&
      !currentChoicePlayers.has(player.id)
    );

  });


  const choices = [];


  // ----------------------------------------------------------
  // STEP 2:
  // Pick 3 DIFFERENT players.
  // ----------------------------------------------------------

  while (
    choices.length < 3 &&
    pool.length > 0
  ) {

    const player = weightedRandomPlayer(pool);

    if (!player) {
      break;
    }

    // Add player to this choice.
    choices.push(player);

    // VERY IMPORTANT:
    // Add them to the current choice immediately.
    currentChoicePlayers.add(player.id);

    // Remove them from the pool.
    // This makes duplicates impossible.
    pool = pool.filter(
      p => p.id !== player.id
    );
  }


  // ----------------------------------------------------------
  // STEP 3:
  // If there aren't 3 players at that position,
  // use other unused players as backup.
  // ----------------------------------------------------------

  if (choices.length < 3) {

    let backup = players.filter(player => {

      return (
        !currentDraftPlayers.has(player.id) &&
        !currentChoicePlayers.has(player.id) &&
        !choices.some(
          p => p.id === player.id
        )
      );

    });


    while (
      choices.length < 3 &&
      backup.length > 0
    ) {

      const player =
        weightedRandomPlayer(backup);

      if (!player) {
        break;
      }

      choices.push(player);

      currentChoicePlayers.add(player.id);

      backup = backup.filter(
        p => p.id !== player.id
      );
    }
  }


  // ----------------------------------------------------------
  // FINAL DUPLICATE SAFETY CHECK
  // ----------------------------------------------------------

  const uniqueChoices = [
    ...new Map(
      choices.map(player => [
        player.id,
        player
      ])
    ).values()
  ];


  return uniqueChoices.slice(0, 3);
}


// ============================================================
// START A NEW DRAFT
// ============================================================
// CALL THIS WHEN THE USER STARTS A NEW DRAFT.
// ============================================================

function resetDraftPlayerPool() {

  currentDraftPlayers.clear();
  currentChoicePlayers.clear();

}


// ============================================================
// SHOWING A NEW POSITION
// ============================================================
// Call this BEFORE generating the next 3 players.
// ============================================================

function startPlayerChoice() {

  // Clear only the previous 3-player screen.
  currentChoicePlayers.clear();

}


// ============================================================
// PLAYER WAS SELECTED
// ============================================================
// IMPORTANT:
// Call this when the user actually picks a player.
// ============================================================

function markPlayerSelected(player) {

  if (!player || player.id == null) {
    return;
  }

  // This player is now permanently unavailable
  // for the rest of this draft.
  currentDraftPlayers.add(player.id);

  // Remove from current choice.
  currentChoicePlayers.delete(player.id);
}
