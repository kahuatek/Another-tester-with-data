//pageMainScript.js
import { fetchSheetData } from './SheetsScript.js';
import { initMap } from './MapScript.js';

async function text(id) {
    const configJS = await fetch('./config.json'); 
    const config = await configJS.json();

    const markerIconsJS = await fetch('./Images/icons/icons.json'); 
    const markerIcons = await markerIconsJS.json();
    console.log(markerIcons.icons["icon"])
    const markers = await fetchSheetData(config.sheet_config.main_sheet.id, config.sheet_config.main_sheet.markers);

    //const table = document.getElementById(id);
    //table.innerText = JSON.stringify(data, null, 2);

    initMap("./Images/MBAM.png", markers, markerIcons, config.general_config.cur_gen, "map")
}

text("text");