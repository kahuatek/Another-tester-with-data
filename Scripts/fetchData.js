//fetchData.js
const SHEET_ID = "1Qv5yAojhOPR259mfrXL3qha0HiVgYIBzt2o4JgZeZFc";
const SHEET_NAME = "Sheet1"; // change if needed

async function loadSheet() {

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

  document.getElementById("status").innerText = "Loading...";

  try {

    const response = await fetch(url);
    const text = await response.text();

    // Google wraps the JSON in a JS function, so we strip it
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const rows = json.table.rows;
    const cols = json.table.cols;

    const table = document.getElementById("sheetTable");
    table.innerHTML = "";

    // Create header
    const header = document.createElement("tr");

    cols.forEach(col => {
      const th = document.createElement("th");
      th.innerText = col.label || "";
      header.appendChild(th);
    });

    table.appendChild(header);

    // Create rows
    rows.forEach(row => {

      const tr = document.createElement("tr");

      row.c.forEach(cell => {
        const td = document.createElement("td");
        td.innerText = cell ? cell.v : "";
        tr.appendChild(td);
      });

      table.appendChild(tr);

    });

    document.getElementById("status").innerText = "Loaded successfully.";

  } catch (error) {

    document.getElementById("status").innerText = "Error loading sheet.";
    console.error(error);

  }

}
