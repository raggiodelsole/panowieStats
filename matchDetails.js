function createMatchData(data) {
  const dataRounds = data.rounds[0];
  const matchDetails = dataRounds.round_stats;
  const basicData = {
    Map: matchDetails.Map,
    Rounds: matchDetails.Rounds,
  };
  const resultData = getScoreDetailProps(dataRounds);
  const matchData = { ...basicData, ...resultData };
  return matchData;
}

function isFirstTeamOurs(dataRounds) {
  let playersFromMatch = dataRounds.teams[0].players;
  for (const player of playersFromMatch) {
    if (players.includes(player.nickname)) {
      return true;
    }
  }
  return false;
}

function weWon(dataRounds) {
  let ourTeamId = isFirstTeamOurs(dataRounds)
    ? dataRounds.teams[0].team_id
    : dataRounds.teams[1].team_id;
  const winnerTeamId = dataRounds.round_stats.Winner;
  return winnerTeamId === ourTeamId;
}
function getScoreDetailProps(dataRounds) {
  const score = dataRounds.round_stats.Score;
  const roundsAsStrings = score.split("/");
  const roundsAsNumbers = convertToNumbers(roundsAsStrings);
  const sortedRoundsAsNumbers = roundsAsNumbers.sort((a, b) => a - b);
  const weWonThisMatch = weWon(dataRounds);
  const ourRounds = getOutRounds(weWonThisMatch, sortedRoundsAsNumbers);
  const enemyRounds = getEnemyRounds(weWonThisMatch, sortedRoundsAsNumbers);
  const wonGameProp = weWonThisMatch ? 1 : 0;
  return {
    Win: wonGameProp,
    "Rounds Won": ourRounds,
    "Rounds Lost": enemyRounds,
  };
}

function convertToNumbers(roundsAsStrings) {
  const roundsAsNumbers = [];
  for (let roundsNumber of roundsAsStrings) {
    roundsAsNumbers.push(parseInt(roundsNumber.replaceAll("\\s", "")));
  }
  return roundsAsNumbers;
}

function getOutRounds(weWonThisMatch, sortedRoundsAsNumbers) {
  return weWonThisMatch ? sortedRoundsAsNumbers[1] : sortedRoundsAsNumbers[0];
}

function getEnemyRounds(weWonThisMatch, sortedRoundsAsNumbers) {
  return weWonThisMatch ? sortedRoundsAsNumbers[0] : sortedRoundsAsNumbers[1];
}
