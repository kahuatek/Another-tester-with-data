//MapScript.js

let map;
let bounds;
let width;
let height;

// Init Map
export async function initMap(path, markers, objectID) {
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
}

function initMarkers(markers) {
    const baseIconSize = 10;
    const customIcon = L.icon({ 
        iconUrl: 'Images/Icon.png', 
        iconSize: [10, 10], // size of icon 
        iconAnchor: [5, 5], // where the marker point is 
        popupAnchor: [0, 0] // popup position 
    });

    const marker = L.marker([100,100], { icon: customIcon })
    .addTo(map)
    .bindPopup("Example location");

    function updateMarkerSize() {

    const zoom = map.getZoom();
    const scale = map.getZoomScale(zoom, map.getMinZoom());
    const size = baseIconSize * scale;

    const icon = L.icon({
        iconUrl: 'Images/Icon.png',
        iconSize: [size, size],
        iconAnchor: [size/2, size/2],
        className: 'marker-class'
    });

    marker.setIcon(icon);
    }

    map.on("zoom", updateMarkerSize);
    updateMarkerSize();
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