async function main() {
  let dataFromGames = await processData();
  let playersData = updateTrackedPlayersStats(dataFromGames);
  return processPlayerData(playersData);
}

function processPlayerData(playersData) {
  const  processedObjects = playersData; //todo: it is simplyfied a lot
  const activePlayers = processedObjects.filter(filter0KillsPlayers);
  const sortedActivePlayers = activePlayers.sort(comparePlayerStats);
  const sortedActivePlayersWithIndex = addIndex(sortedActivePlayers);
  return sortedActivePlayersWithIndex;
}

function addIndex(players) {
  let index = 1;
  const playersWithIndex = [];
  for (const player of players) {
    let newPlayer = {
      Index: index,
      ...player,
    };
    index++;
    playersWithIndex.push(newPlayer);
  }
  return playersWithIndex;
}

function filter0KillsPlayers(playerStat) {
  return playerStat["Kills"] > 0;
}

function getValueOfPropertyOdZero(value) {
  return value ? value : 0;
}

function comparePlayerStats(a, b) {
  if (a.Kills < b.Kills) {
    return 1;
  }
  if (a.Kills > b.Kills) {
    return -1;
  }
  if (a["K-D Difference"] < b["K-D Difference"]) {
    return 1;
  }
  if (a["K-D Difference"] > b["K-D Difference"]) {
    return -1;
  }
  return 0;
}
