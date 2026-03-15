//LeafletIntegration.js
// image size
const width = 791;
const height = 463;

// create map using simple coordinate system
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

// image bounds
const bounds = [[0,0], [height, width]];

// add the image as the map
L.imageOverlay('Images/Island.png', bounds).addTo(map);

// fit map to image
map.fitBounds(bounds);

// example marker
L.marker([100, 100]).addTo(map)
  .bindPopup("Example location")
  .openPopup();

window.calculateMinZoom = function(){

  const size = map.getSize();

  const zoomX = size.x / width;
  const zoomY = size.y / height;

  const scale = Math.min(zoomX, zoomY);

  const zoom = Math.log2(scale);

  map.setMinZoom(zoom);
  console.log(zoom);

}