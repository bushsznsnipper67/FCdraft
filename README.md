# ⚽ FCdraft

FCdraft is a football player draft game inspired by the squad-building and draft systems found in modern football games.

Build your squad, make smart choices, earn coins, buy players, and create your ultimate team.

---

## 🎮 Features

### 🃏 Player Draft

- Choose a formation.
- Select positions on the pitch.
- Receive 3 player choices for each position.
- Players are randomly selected.
- Each player has an individual spawn chance.
- Higher-rated players are rarer.
- Lower-rated players are more common.
- A player cannot appear twice during the same draft.
- A player cannot appear twice in the same 3-player choice.
- Every new draft resets the player pool.

---

## 🎲 Random Player Spawn System

FCdraft uses a weighted random system instead of simply choosing players from a list.

The approximate spawn weighting is:

| Rating | Spawn Weight |
|---|---:|
| 95+ | 0.25 |
| 92–94 | 0.5 |
| 90–91 | 1 |
| 88–89 | 2 |
| 85–87 | 4 |
| 82–84 | 7 |
| 78–81 | 12 |
| 75–77 | 18 |
| 70–74 | 28 |
| 65–69 | 40 |
| Below 65 | 55 |

A higher weight means a higher chance of spawning.

This does not guarantee that a certain rating will appear. Every eligible player still has a random chance.

---

## 🚫 Duplicate Protection

FCdraft prevents duplicate players in a draft.

The game keeps track of:

- Players already shown during the draft.
- Players currently displayed in the 3-player selection.
- Players already selected into the squad.

Once a player has appeared during a draft, that player cannot appear again until a new draft is started.

---

## 💰 Coins

FCdraft uses an in-game coin system.

Coins can be earned by playing matches and winning rewards.

Example match rewards:

| Difficulty | Reward |
|---|---:|
| Beginner | +50 |
| Amateur | +75 |
| Semi-Pro | +100 |
| Professional | +150 |
| World Class | +225 |
| Legendary | +350 |

Coins can be used to purchase players from the Market.

---

## 🛒 Market

The Market allows players to spend their in-game coins on football players.

Purchased players can become part of your club and can be used in future squad building.

There are no real-money deposits or pay-to-win purchases.

---

## 👑 Prime Players

FCdraft includes a Prime system.

Players can be upgraded to their Prime rating using in-game coins.

Prime players have a higher rating than their normal version.

The Prime system is stored locally so the upgrade remains available when the page is reopened on the same browser.

---

## 🏟️ Matches

Choose a match difficulty and earn coins through match rewards.

Available difficulties include:

- Beginner
- Amateur
- Semi-Pro
- Professional
- World Class
- Legendary

Match results and rewards are stored locally.

---

## 👤 My Club

My Club displays players that belong to your club.

You can use it to view:

- Owned players
- Player ratings
- Positions
- Prime upgrades
- Your squad

---

## 🧩 Formations

FCdraft supports multiple football formations.

Select your formation before starting the draft and build your squad position by position.

---

## 💾 Local Storage

FCdraft currently uses browser `localStorage` to save game data.

This can store:

- Coins
- Owned players
- Prime players
- Squad
- Selected formation
- Match history
- Other game progress

Clearing the browser's local storage can reset the game.

---

## 🛠️ Technologies

FCdraft is built using:

- HTML
- CSS
- JavaScript
- Browser localStorage

No external framework is required for the current version.

---

## 📁 Project Structure

```text
FCdraft/
│
├── index.html
├── style.css
├── app.js
└── README.md
