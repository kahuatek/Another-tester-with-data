//MapScript.js

//Init Map
export function initMap(path, markers, objectID) {
    const base   = initImage(path);
    const width  = base.naturalWidth;
    const height = base.naturalHeight;

    const bounds = [[0,0],[height,width]];

    const map    = L.map(objectID, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2
    });

    const overlay = L.imageOverlay(path, bounds, {
    className: 'imagemap-class'
    }).addTo(map);

    map.setMaxBounds(bounds);

    window.addEventListener("load", calculateZoomLimits);
    window.addEventListener('resize', calculateZoomLimits);   
}

//Init Markers
function initMarkers(markers) {

}

async function initImage(path)  {
    const image = await Image();
    image.src = path;
    return image;
}

function calculateZoomLimits() {
    const size = map.getSize();
    const scaleX = size.x / width;
    const scaleY = size.y / height;
    const scale = Math.min(scaleX, scaleY);

    const minZoom = Math.log2(scale);
    const zoomInLevels = 3;

    map.setMinZoom(minZoom);
    map.setMaxZoom(minZoom + zoomInLevels);

    map.fitBounds(bounds);
}
