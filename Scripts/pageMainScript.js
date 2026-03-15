//pageMainScript.js
import { fetchSheetData } from './SheetsScript.js';

async function text(id) {
    const config = await fetch('./config.json'); 
    const data = await fetchSheetData(config.sheet_config.main_sheet.id, config.sheet_config.main_sheet.markers)

    const table = document.getElementById(id);
    table.innerText = data;
}

text("map")