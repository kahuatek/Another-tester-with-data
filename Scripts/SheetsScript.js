//SheetsScript.js
export async function fetchSheetData(sheetID, sheetName) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));

        const table = json.table;
        console.log(table)
        const attributes = table.rows[0].c.map(cell => cell?.v);
        console.log(attributes)
        const data = table.rows.slice(1).map(row => {
            const obj = {};
            row.c.forEach((cell, i) => {
                obj[attributes[i]] = cell?.v ?? null;
            });
            return obj;
        });

        return data;

    } catch (error) {
        console.error(error);
        return null;
    }
}