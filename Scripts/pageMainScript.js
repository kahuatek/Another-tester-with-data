//pageMainScript.js
import { fetchSheetData } from './SheetsScript.js';

async function text(id) {
    const configJS = await fetch('./config.json'); 
    const config = await configJS.json();
    const data = await fetchSheetData(config.sheet_config.main_sheet.id, config.sheet_config.main_sheet.markers);

    const table = document.getElementById(id);
    table.innerText = JSON.stringify(data, null, 2);

    initMap("./Images/Island.png", {}, "map")
}

text("text");