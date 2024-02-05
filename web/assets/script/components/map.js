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

    this.listen(document.body, "_surfrate.spot.created", this.createMarkers);
    this.listen(document.body, "_surfrate.spot.click", this.zoomTo);
    this.listen(document.body, "_surfrate.user.logout", this.clearMarkers);
    this.createMarkers();
  }

  initializeMap = () => {
    this.map = L.map(this.root, {});

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
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

  createMarkers = async () => {
    this.clearMarkers();
    const spots = await localStorage.getSpots();
    if (!spots) return;
    spots.forEach((spot) => {
      const [lng, lat] = spot.location.coordinates;
      new L.marker([lat, lng], {
        title: spot.name,
        id: spot.id,
      })
        .addTo(this.map)
        .on("click", ({ target }) => {
          const { lat, lng } = target._latlng;
          this.map.flyTo([lat, lng], 13);
          this.dispatch(this.root, "_surfrate.map.spot.click", {
            id: target.options.id,
          });
        });
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
