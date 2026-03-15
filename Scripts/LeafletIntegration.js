//LeafletIntegration.js
const imagepath = "Images/Island.png";

const img = new Image();
img.src = imagepath;
var width = 0;
var height = 0;

img.onload = function () {

    width = img.width;
    height = img.height;

  const bounds = [[0,0],[height,width]];

  L.imageOverlay(img.src, bounds).addTo(map);
  map.fitBounds(bounds);

};

const bounds = [[0,0],[height,width]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  zoomSnap: 1,
  zoomDelta: 1
});

// add image
L.imageOverlay(imagepath, bounds).addTo(map);

// give Leaflet an initial state
map.fitBounds(bounds);

// now safe to limit panning
map.setMaxBounds(bounds);

map.whenReady(calculateZoomLimits);
window.addEventListener('resize', calculateZoomLimits);

// dynamic zoom
function calculateZoomLimits() {
    const size = map.getSize();
    const scaleX = size.x / width;
    const scaleY = size.y / height;
    const scale = Math.min(scaleX, scaleY);

    const minZoom = Math.log2(scale);
    const zoomInLevels = 5;

    map.setMinZoom(minZoom);
    map.setMaxZoom(minZoom + zoomInLevels);

    map.fitBounds(bounds);
}



const customIcon = L.icon({
  iconUrl: 'Images/Icon.png',

  iconSize: [10, 10],      // size of icon
  iconAnchor: [5, 5],      // where the marker point is
  popupAnchor: [0, 0]     // popup position
});

L.marker([100,100], { icon: customIcon })
  .addTo(map)
  .bindPopup("Example location");