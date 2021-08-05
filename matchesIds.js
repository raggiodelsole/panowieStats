async function getMatchesIds() {
  const currentTime = Date.now() / 1000;
  const maxMatchesNumber = 60; //trzeba potestowac ten endpoint-we might need more - fajniebybylo  wyciagac starsze mecze ale ciezko bedzie
  // const currentTime = Date.now() / 1000;
  const yesterdayTime = currentTime - 86400 * daysAmount; //tutaj zmienaic ilsc dni- wystarczy pomnozyc 86400 to doda sie dzien

  // const maxMatchesNumber = 5; //trzeba potestowac ten endpoint-we might need more
  // const yesterdayTime = currentTime - 86400 * 2; //tutaj zmienaic ilsc dni- wystarczy pomnozyc 86400 to doda sie dzien
  const playerId = getMainPlayerId();
  const secondPlayerId = getSecondaryPlayerId();

  const data = await getPlayerHistoryFromFaceit(
    playerId,
    maxMatchesNumber,
    currentTime,
    yesterdayTime
  );

  let matchesId = [];
  for (match of data.items) {
    if (match.started_at > yesterdayTime) {
      matchesId.push(match.match_id);
    }
  }
  const secondSourceData = await getPlayerHistoryFromFaceit(
    secondPlayerId,
    maxMatchesNumber,
    currentTime,
    yesterdayTime
  );
  for (match of secondSourceData.items) {
    if (
      !matchesId.includes(match.match_id) &&
      match.started_at > yesterdayTime
    ) {
      matchesId.push(match.match_id);
    }
  }

  return matchesId;
}
