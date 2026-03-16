//MapScript.js
let map;
let bounds;
let width;
let height;

// Init Map
export async function initMap(path, markers, icons, objectID) {
    console.log("map")
    const image = await loadImage(path);
    width = image.naturalWidth;
    height = image.naturalHeight;

    bounds = [[0, 0], [height, width]];

    map = L.map(objectID, {
        crs: L.CRS.Simple
    });

    L.imageOverlay(path, bounds, {
        className: 'imagemap-class'
    }).addTo(map);

    map.setMaxBounds(bounds);

    calculateZoomLimits();

    window.addEventListener("resize", calculateZoomLimits);

    initMarkers(markers, icons);
}

function initMarkers(markers, icons) {
    markers.forEach(marker => {
        const icon = L.icon({
            iconUrl: icons.icons[marker.icon],
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            className: 'marker-class'
        });

        const onmapmarker = L.marker([marker.x, marker.y], { icon: icon })
        .addTo(map)
        .bindPopup(marker.name);
    });
}

function loadImage(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = path;
    });
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