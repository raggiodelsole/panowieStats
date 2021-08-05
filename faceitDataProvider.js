async function getPlayerHistoryFromFaceit(
  playerId,
  maxMatchesNumber,
  currentTime,
  yesterdayTime
) {
  const response = await fetch(
    `https://open.faceit.com/data/v4/players/${playerId}/history?game=csgo&from=${yesterdayTime}&to=${currentTime}&limit=${maxMatchesNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getKey()}`,
      },
    }
  );
  return await response.json();
}

async function getMatchStatsFromFaceit(matchId) {
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
  return await response.json();
}
