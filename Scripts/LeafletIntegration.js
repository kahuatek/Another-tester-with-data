const width = 791;
const height = 463;

const bounds = [[0,0],[height,width]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

const overlay = L.imageOverlay('Images/Island.png', bounds, {
  className: 'leaflet-image-map'
}).addTo(map);

map.setMaxBounds(bounds);

// dynamic zoom
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

map.whenReady(calculateZoomLimits);
window.addEventListener('resize', calculateZoomLimits);