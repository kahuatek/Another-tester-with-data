//pageMainScript.js
import { fetchSheetData } from './SheetsScript.js';
import { initMap } from './MapScript.js';

async function text(id) {
    const configJS = await fetch('./config.json'); 
    const config = await configJS.json();

    const markerIconsJS = await fetch('./Images/icons/icons.json'); 
    const markerIcons = await markerIconsJS.json();
    const markers = await fetchSheetData(config.sheet_config.main_sheet.id, config.sheet_config.main_sheet.markers);

    const table = document.getElementById(id);
    table.innerText = JSON.stringify(data, null, 2);

    initMap("./Images/Island.png", markers, markerIcons, "map")
}

text("text");