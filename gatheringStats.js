const players = [
  "Rassiq",
  "Yelwo",
  "creep7",
  "Turas2369",
  "duelzjeh",
  "MagicKenn",
  "Pod0l",
  "RyhDH",
];
const mapsPlayed = [];

function processGameStats(data) {
  const matchesData = [];
  const combinePlayers = [
    ...data.rounds[0].teams[0].players,
    ...data.rounds[0].teams[1].players,
  ];
  if (atLeastTwoPanowiePlayersPlayed(combinePlayers)) {
    mapsPlayed.push(data.rounds[0].round_stats.Map);
    const matchData = createMatchData(data);
    for (let player of combinePlayers) {
      if (players.includes(player.nickname)) {
        let playerMatchData = {
          Nickname: player.nickname,
          ...player.player_stats,
          ...matchData,
        };

        matchesData.push(playerMatchData);
      }
    }
  }
  console.log("gathered match data: ");
  console.log(matchesData);
  return matchesData;
}

async function processData() {
  let matchesIds = await getMatchesIds();
  let dataFromGames = [];
  matchesIds.reverse();
  for (const matchId of matchesIds) {
    let statsFromFaceit = await getMatchStatsFromFaceit(matchId);
    let singleMatchData = processGameStats(statsFromFaceit);
    for (const matchData of singleMatchData) {
      dataFromGames.push(matchData);
    }
  }
  return dataFromGames;
}

function updateTrackedPlayersStats(dataFromGames) {
  const combineStats = [];
  for (const playerName of players) {
    let indexes = getIndexesFor(playerName, dataFromGames);
    let combinePlayerStats = consolidateDataFromMultipleMatches(
      playerName,
      indexes,
      dataFromGames
    );
    combineStats.push(combinePlayerStats);
  }
  return combineStats;
}


function getIndexesFor(nick, dataFromGames) {
  let indexes = [];
  for (let i = 0; i < dataFromGames.length; i++) {
    if (nick === dataFromGames[i].Nickname) {
      indexes.push(i);
    }
  }
  return indexes;
}

function consolidateDataFromMultipleMatches(
  playerName,
  indexes,
  dataFromGames
) {
  let playerStats = {
    Nickname: playerName,
    Kills: 0,
    Deaths: 0,
    Assists: 0,
    MVPs: 0,
    Headshots: 0,
    "Triple Kills": 0,
    "Quadro Kills": 0,
    Aces: 0,
    "Rounds Lost": 0,
    "Rounds Won": 0,
    "Matches Won": 0,
    "Matches Played": 0,
    "Maps played": [],
  };
  let playedMaps = [];
  for (index of indexes) {
    dataSource = dataFromGames[index];
    // console.log('dataSource')
    // console.log(dataSource)
    playerStats.Kills += Number(dataSource.Kills);
    playerStats.Deaths += Number(dataSource.Deaths);
    playerStats.Assists += Number(dataSource.Assists);
    playerStats.MVPs += Number(dataSource["MVPs"]);
    playerStats.Headshots += Number(dataSource.Headshots);
    playerStats["Triple Kills"] += Number(dataSource["Triple Kills"]);
    playerStats["Quadro Kills"] += Number(dataSource["Quadro Kills"]);
    playerStats["Rounds Lost"] += Number(dataSource["Rounds Lost"]);
    playerStats["Rounds Won"] += Number(dataSource["Rounds Won"]);
    playerStats["Matches Won"] += Number(dataSource["Result"]);
    playedMaps.push(dataSource["Map"]);
  }
  playerStats["Matches Played"] += indexes.length;
  playerStats["Maps played"] = playedMaps;
  return playerStats;
}

function atLeastTwoPanowiePlayersPlayed(combinePlayers) {
  let counter = 0;
  for (const player of combinePlayers) {
    if (players.includes(player.nickname)) {
      counter++;
    }
  }
  return counter > 1;
}
