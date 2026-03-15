
const SHEET_ID = "1Qv5yAojhOPR259mfrXL3qha0HiVgYIBzt2o4JgZeZFc";
const SHEET_NAME = "Sheet1";

const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

// create map
const map = L.map('map').setView([51.0, 10.0], 6);

// map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// load sheet
fetch(url)
.then(res => res.text())
.then(text => {

  const json = JSON.parse(text.substring(47).slice(0,-2));

  const cols = json.table.cols.map(c => c.label);
  const rows = json.table.rows;

  rows.forEach(row => {

    const obj = {};

    row.c.forEach((cell,i)=>{
      obj[cols[i]] = cell ? cell.v : "";
    });

    const lat = parseFloat(obj.Lat);
    const lng = parseFloat(obj.Lng);

    if(!isNaN(lat) && !isNaN(lng)){

      const marker = L.marker([lat,lng]).addTo(map);

      marker.bindPopup(`
        <b>${obj.Name}</b><br>
        ${obj.Info}
      `);

    }

  });

});
