const players = ["Rassiq", "Yelwo", "creep7", "Turas2369", "duelzjeh", "MagicKenn"];
const matchesData = [];
const mapsPlayed = [];

async function getStatsFromMatch(matchId) {
  //   let matchId = "1-63e9d633-1d67-4912-8d7c-2caf62d7c2b1";
  const response = await fetch(
    `https://open.faceit.com/data/v4/matches/${matchId}/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getKey()}`,
      },
    }
  );
  const data = await response.json();
  processGameStats(data);
}

function processGameStats(data) {
  mapsPlayed.push(data.rounds[0].round_stats.Map);

  const combinePlayers = [
    ...data.rounds[0].teams[0].players,
    ...data.rounds[0].teams[1].players,
  ];

  for (const player of combinePlayers) {
    if (players.includes(player.nickname)) {
      matchesData.push(player);
    }
  }
}

async function processData() {
  let matchesIds = await getTodaysMatchesIds();
  matchesIds.reverse()
  for (const id of matchesIds) {
    await getStatsFromMatch(id);
  }
}

async function main() {
  console.log("starting");
  await processData();
  console.log("cream de la cream: ");
  console.log(matchesData);
  console.log("Maps played in order: ");
  console.log(mapsPlayed);
  console.log("the end");
  updateTrackedPlayersStats();
}
// main();
// singleGameTesting();

async function singleGameTesting() {
  let matchId = "1-63e9d633-1d67-4912-8d7c-2caf62d7c2b1";
  const response = await fetch(
    `https://open.faceit.com/data/v4/matches/${matchId}/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getKey()}`,
      },
    }
  );
  const data = await response.json();
  processGameStats(data);
  updateTrackedPlayersStats();
}

function updateTrackedPlayersStats() {
  let trackedPlayersArray = getArrayWithTrackedPlayers();
  updatedTrackedPlayersArray = [];
  for (trackedPlayer of trackedPlayersArray) {
    let indexes = getIndexesFor(trackedPlayer.nickname);
    let ttpp = updateTrackedPlayer(trackedPlayer, indexes);
    updatedTrackedPlayersArray.push(ttpp);
  }
  displayPlayerStats(updatedTrackedPlayersArray);
}

function getArrayWithTrackedPlayers() {
  let trackPlayers = [];
  for (player of players) {
    trackPlayers.push(new TrackedPlayer(player, 0, 0, 0, 0, 0, 0, 0, 0, 0));
  }
  return trackPlayers;
}


class TrackedPlayer {
  constructor(
    nickname,
    kills,
    deaths,
    assists,
    mvps,
    tripple,
    quadro,
    penta,
    hs
  ) {
    this.nickname = nickname;
    this.kills = kills;
    this.deaths = deaths;
    this.assists = assists;
    this.mvps = mvps;
    this.penta = penta;
    this.quadro = quadro;
    this.tripple = tripple;
    this.hs = hs;
  }
}

function getIndexesFor(nick) {
  let indexes = [];
  for (let i = 0; i < matchesData.length; i++) {
    if (nick === matchesData[i].nickname) {
      indexes.push(i);
    }
  }
  return indexes;
}

function updateTrackedPlayer(trackedPlayer, indexes) {
  for (index of indexes) {
    dataSource = matchesData[index].player_stats;
    trackedPlayer.kills += Number(dataSource.Kills);
    trackedPlayer.deaths += Number(dataSource.Deaths);
    trackedPlayer.assists += Number(dataSource.Assists);
    trackedPlayer.hs += Number(dataSource.Headshots);
    trackedPlayer.mvps += Number(dataSource.MVP);
    trackedPlayer.penta += Number(dataSource["Penta Kills"]);
    trackedPlayer.tripple += Number(dataSource["Tripple Kills"]);
    trackedPlayer.quadro += Number(dataSource["Quadro Kills"])
  }
  return trackedPlayer;
}

function displayPlayerStats(updatedTrackedPlayersArray) {
  for (const player of updatedTrackedPlayersArray) {
    console.log(
      player.nickname + " Kills: " + player.kills + " Deaths: " + player.deaths
    );
  }
}
