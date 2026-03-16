const width = 791;
const height = 463;

const bounds = [[0,0],[height,width]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 2
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

window.addEventListener("load", calculateZoomLimits);
window.addEventListener('resize', calculateZoomLimits);

const baseIconSize = 10;

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
    className: 'marker'
  });

  marker.setIcon(icon);
}

map.on("zoom", updateMarkerSize);
updateMarkerSize();