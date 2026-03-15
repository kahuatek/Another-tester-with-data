//pageMainScript.js
import { fetchSheetData } from './SheetsScript.js';

async function text(id) {
    const config = await fetch('./config.json'); 
    const data = await fetchSheetData("1Qv5yAojhOPR259mfrXL3qha0HiVgYIBzt2o4JgZeZFc", "markers")

    const table = document.getElementById(id);
    table.innerText = JSON.stringify(data, null, 2);
}

text("map")