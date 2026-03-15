//pageMainScript.js
import { fetchSheetData } from './SheetsScript.js';
const config = fetch('../config.json');

data = fetchSheetData(config.sheet_config.main_sheet.id, config.sheet_config.main_sheet.markers)

function text(id) {
    const table = document.getElementById(id);
    table.innerText = data;
}

text("map")