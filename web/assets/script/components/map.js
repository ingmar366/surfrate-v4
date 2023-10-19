_surfrate.components.Map = class Map extends _surfrate.components.Base {
  root;
  params;
  map;

  constructor(root, _, params) {
    super();

    this.root = root;
    this.params = params;

    this.initializeMap();
    this.listen(document, "_surfrate.map.click", () =>
      this.map.on("click", this.mapClick)
    );
    this.createMarkers();

    this.listen(document.body, "_surfrate.spot.created", this.createMarkers);
    this.listen(document.body, "_surfrate.spot.click", this.zoomTo);
    this.listen(document.body, "_surfrate.user.logout", this.initializeMap);
  }

  initializeMap = () => {
    this.map = L.map(this.root, {});

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.fitBounds([
      [57.119537, -1.536334],
      [50.71459, 6.219187],
    ]);
  };

  mapClick = ({ latlng }) => {
    const lat = latlng.lat;
    const lng = latlng.lng;
    this.dispatch(this.root, "_surfrate.map.location", { lat, lng });
    this.map.off("click", this.mapClick);
  };

  createMarkers = () => {
    this.clearMarkers();
    const spots = localStorage.getSpots();
    if (!spots) return;
    spots.forEach((spot) => {
      const [lng, lat] = spot.location.coordinates;
      new L.marker([lat, lng], { title: spot.name }).addTo(this.map);
    });
  };

  clearMarkers = () =>
    Object.entries(this.map._layers).forEach(([_, value]) => {
      //clear all old markers
      if (value?.dragging?._marker) this.map.removeLayer(value);
    });

  zoomTo = ({ detail }) => {
    const coordinates = detail.coordinates.split(",");
    const latLng = [+coordinates[0], +coordinates[1]];
    this.map.flyTo(latLng, 13);
  };
};
