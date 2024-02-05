_surfrate.components.SpotOverview = class SpotOverview extends (
  _surfrate.components.Base
) {
  root;
  elements;
  params;

  constructor(root, elements, params) {
    super();

    this.root = root;
    this.elements = elements;
    this.params = params;

    this.listen(document.body, "_surfrate.map.spot.click", ({ detail }) =>
      Array.from(this.root.children).forEach((el) =>
        el[el?.dataset?.id == detail.id ? "setAttribute" : "removeAttribute"](
          "selected",
          ""
        )
      )
    );

    this.listen(document.body, "_surfrate.spot.created", this.renderSpots);
    this.renderSpots();
  }

  renderSpots = () => {
    localStorage.getSpots().then((spots) => {
      if (!spots) return;
      const template = this.elements.template.innerHTML;
      const renderSpots = spots
        .map(({ location, name, id }, index) => {
          const [lng, lat] = location.coordinates;
          const coordinates = `data-coordinates="${lat},${lng}" data-id="${id}"`;
          return template
            .replace("spotName", name)
            .replace("number", index)
            .replace('coordinates=""', coordinates)
            .replaceAll('data-surfspot-id=""', `id=${id}`)
            .replace('for=""', `for="${id}"`);
        })
        .join("\n");
      this.root.innerHTML = renderSpots;

      this.allSpots = this.root.querySelectorAll("[spot]");
      this.allSpots.forEach((spot) =>
        this.listen(spot, "click", this.selectSpot)
      );
    });
  };

  selectSpot = ({ target }) => {
    const spot = target.closest("[spot]");
    this.allSpots.forEach((el) => {
      el[`${el == spot ? "set" : "remove"}Attribute`]("selected", "");
    });
    this.dispatch(this.root, "_surfrate.spot.click", {
      coordinates: spot.dataset.coordinates,
    });
  };
};
