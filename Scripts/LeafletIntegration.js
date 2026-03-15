const width = 791;
const height = 463;

const bounds = [[0,0],[height,width]];

const map = L.map('map',{
  crs: L.CRS.Simple
});

L.imageOverlay("Images/Island.png", bounds).addTo(map);

function calculateMinZoom(){

  const size = map.getSize();

  const zoomX = size.x / width;
  const zoomY = size.y / height;

  const scale = Math.min(zoomX, zoomY);

  const zoom = Math.log2(scale);

  map.setMinZoom(zoom);

}

map.whenReady(() => {
  calculateMinZoom();
  map.fitBounds(bounds);
});

window.addEventListener("resize", calculateMinZoom);