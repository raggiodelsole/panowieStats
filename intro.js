function getCurrentDate() {
  today = new Date();
  y = today.getFullYear();
  m = today.getMonth() + 1;
  d = today.getDate();
  dayOfWeek = getDayOfWeek(today.getDay());
  document.getElementById("data").innerHTML =
    d + "/" + m + "/" + y + " - " + dayOfWeek;
}

function getDayOfWeek(day) {
  switch (day) {
    case 0:
      return "Niedziela";
    case 1:
      return "Poniedziałek";
    case 2:
      return "Wtorek";
    case 3:
      return "Środa";
    case 4:
      return "Czwartek";
    case 5:
      return "Piątek";
    case 6:
      return "Sobota";
  }
}
getCurrentDate();

async function getTodaysMatchesIds() {
  const maxMatchesFetched = 20;
  const currentTime = Date.now() / 1000;
  const yesterdayTime = currentTime - 86400; //tutaj zmienaic ilsc dni- wystarczy pomnozyc 86400 to doda sie dzien

  const response = await fetch(
    `https://open.faceit.com/data/v4/players/${getMainPlayerId()}/history?game=csgo&from=${yesterdayTime}&to=${currentTime}&limit=${maxMatchesFetched}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getKey()}`,
      },
    }
  );
  const data = await response.json();

  let todaysMatchesIds = [];
  for (match of data.items) {
    if (match.started_at > yesterdayTime) {
      todaysMatchesIds.push(match.match_id);
    }
  }
return todaysMatchesIds
}
