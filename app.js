// ============================================================
// FCdraft RANDOM PLAYER SPAWN SYSTEM
// ============================================================

// Players selected during the CURRENT draft.
// This resets whenever a new draft starts.
let currentDraftPlayers = new Set();

// Players selected for the CURRENT position choice.
let currentChoicePlayers = new Set();


// ------------------------------------------------------------
// RANDOM WEIGHT
// ------------------------------------------------------------
// Higher-rated players are rarer.
// Lower-rated players have a higher chance to appear.
//
// This is NOT a fixed rating tier system.
// Every player gets a random chance.
// ------------------------------------------------------------

function playerSpawnWeight(player) {

  const rating = getPlayerOvr(player);

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


// ------------------------------------------------------------
// WEIGHTED RANDOM PLAYER
// ------------------------------------------------------------

function weightedRandomPlayer(pool) {

  if (!pool.length) return null;

  let totalWeight = 0;

  pool.forEach(player => {
    totalWeight += playerSpawnWeight(player);
  });

  let random =
    Math.random() * totalWeight;

  for (const player of pool) {

    random -=
      playerSpawnWeight(player);

    if (random <= 0) {
      return player;
    }
  }

  return pool[pool.length - 1];
}


// ------------------------------------------------------------
// GET 3 UNIQUE PLAYER CHOICES
// ------------------------------------------------------------

function candidates(position) {

  const allowed =
    compatiblePositions(position);

  // Only players who can play this position
  let pool =
    players.filter(player =>
      allowed.includes(player.pos)
    );

  // Remove players already selected
  // during this draft.
  pool =
    pool.filter(player =>
      !currentDraftPlayers.has(player.id)
    );

  // Remove players already used in
  // this particular choice.
  pool =
    pool.filter(player =>
      !currentChoicePlayers.has(player.id)
    );

  const choices = [];

  // Keep selecting until we have 3
  // DIFFERENT players.
  while (
    choices.length < 3 &&
    pool.length > 0
  ) {

    const player =
      weightedRandomPlayer(pool);

    if (!player) break;

    choices.push(player);

    // Remove immediately so the same
    // player cannot be selected twice.
    pool =
      pool.filter(
        p => p.id !== player.id
      );
  }

  // If there aren't enough exact-position
  // players, safely fill remaining spaces
  // with unused players.
  if (choices.length < 3) {

    let backup =
      players.filter(player =>
        !currentDraftPlayers.has(player.id) &&
        !choices.some(
          p => p.id === player.id
        )
      );

    while (
      choices.length < 3 &&
      backup.length
    ) {

      const player =
        weightedRandomPlayer(backup);

      if (!player) break;

      choices.push(player);

      backup =
        backup.filter(
          p => p.id !== player.id
        );
    }
  }

  // Final safety check:
  // absolutely no duplicate player IDs.
  return [
    ...new Map(
      choices.map(player => [
        player.id,
        player
      ])
    ).values()
  ].slice(0, 3);
}
