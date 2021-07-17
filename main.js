const players = ["Rassiq", "Yelwo", "creep7", "Turas2369", "duelzjeh"];

const apiKey = getKey();
async function generateStats() {
  let matchId = "1-63e9d633-1d67-4912-8d7c-2caf62d7c2b1";
  const response = await fetch(
    `https://open.faceit.com/data/v4/matches/${matchId}/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await response.json();
  processGameStats(data);
}

generateStats();

function processGameStats(data) {
  const combinePlayers = [
    ...data.rounds[0].teams[0].players,
    ...data.rounds[0].teams[1].players,
  ];
  for (const player of combinePlayers) {
    console.log(player.nickname + " : " + player.player_stats.Kills);
  }
}
