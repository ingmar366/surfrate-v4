_surfrate.components.SpotMenu = class SpotMenu extends (
  _surfrate.components.Base
) {
  root;
  elements;
  active;

  constructor(root, elements) {
    super();

    this.root = root;
    this.elements = elements;
    this.active = "spots";

    this.listen(elements.newSpot, "click", this.activateNewSpot);
    this.listen(document.body, "_surfrate.spot.created", this.activateNewSpot);
  }

  activateNewSpot = () => {
    this.active = this.active == "spots" ? "newSpot" : "spots";

    this[this.active == "newSpot" ? "unlisten" : "listen"](
      this.elements.newSpot,
      "click",
      this.activateNewSpot
    );

    this[this.active == "spots" ? "unlisten" : "listen"](
      this.elements.spots,
      "click",
      this.activateNewSpot
    );
    this.toggleActive();
    if (this.active == "spots")
      this.dispatch(this.root, "_surfrate.activate.spots");
    if (this.active == "newSpot")
      this.dispatch(this.root, "_surfrate.activate.new-newspot");
  };

  toggleActive = () => {
    this.elements.spots.toggleAttribute("data-active");
    this.elements.newSpot.toggleAttribute("data-active");
  };
};
