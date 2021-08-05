let daysAmount = 0;

async function generateTable() {
  const data = await main();
  console.log("data");
  console.log(data);
  let body = document.getElementsByTagName("body")[0];
  removeTableIfPresent();
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");
  createHeaders(tblBody, data[0]);
  generateTableBody(tblBody, data);
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
  tbl.setAttribute("border", "2");
  tbl.setAttribute("id", "statsTable");
  tbl.setAttribute("align", "center");
}

function generateTableBody(tblBody, data) {
  for (const player of data) {
    let row = document.createElement("tr");
    for (const value of Object.values(player)) {
      let cell = document.createElement("td");
      let cellText = document.createTextNode(value);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tblBody.appendChild(row);
  }
}

function createHeaders(tblBody, playerData) {
  let row = document.createElement("tr");
  if (playerData) {
    for (const prop of Object.getOwnPropertyNames(playerData)) {
      let cell = document.createElement("th");
      let cellText = document.createTextNode(prop);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  } else {
    console.log("playerData jest jakims nullem czy czyms takiem");
  }
}

document.getElementById("statsButton").addEventListener("click", generateTable);

function removeTableIfPresent() {
  let tbl = document.getElementById("statsTable");
  if (tbl) {
    tbl.remove();
  }
}

function updateDays() {
  daysAmount = document.getElementById("daysAmountId").value;
}
