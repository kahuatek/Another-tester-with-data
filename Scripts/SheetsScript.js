//SheetsScript.js

export async function fetchSheetData(sheetID, sheetName) {
    var res = null;
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    try {
        const response = await fetch(url);
        const text = await response.text();

        const json = JSON.parse(text.substring(47).slice(0, -2));

        res = json.table;
    } catch (error) {
        console.error(error);
    }
    return res; 
}