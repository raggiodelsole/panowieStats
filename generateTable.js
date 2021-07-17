function generateTable() {
  // get the reference for the body
  let body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");

    //create headers
    
        createHeaders(tblBody);
      

  // creating all cells
  for (let i = 0; i < 2; i++) {
    // creates a table row
    let row = document.createElement("tr");

    for (let j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      let cell = document.createElement("td");
      let cellText = document.createTextNode(
        "cell in row " + i + ", column " + j
      );
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}

generateTable();
function createHeaders(tblBody) {
    let row = document.createElement("tr");

    for (let j = 0; j < 2; j++) {
        let cell = document.createElement("th");
        let cellText = document.createTextNode(
            "cell in row , header " + j
        );
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
}

