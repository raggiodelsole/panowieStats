function getCurrentDate() {
  today = new Date();
  y = today.getFullYear();
  m = today.getMonth() + 1;
  d = today.getDate();
  dayOfWeek = getDayOfWeek(today.getDay());
  // document.getElementById("data").innerHTML =
  //   d + "/" + m + "/" + y + " - " + dayOfWeek;
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
