_surfrate.components.NewSpot = class NewSpot extends _surfrate.components.Base {
  root;
  elements;
  params;

  constructor(root, elements, params) {
    super();

    this.root = root;
    this.elements = elements;
    this.params = params;

    this.listen(
      document.body,
      "change",
      ({ target }) => target.id == "spot-menu-new-spot" && this.show()
    );
  }

  show = () => {
    this.dispatch(this.root, "_surfrate.map.click");
    this.listen(document, "_surfrate.map.location", this.spotHandler);
  };

  spotHandler = ({ detail }) => {
    this.location = detail;
    this.fetching(this.params.path + "/spot/valid", "post", this.location)
      .then((json) => {
        if (!json.data) {
          window.alert(
            "The clicked position in not a valid location. Please click a location that is not to far in sea and not on the land"
          );
          this.dispatch(this.root, "_surfrate.map.click");
          return;
        }
        this.elements.message.setAttribute("hidden", "");
        this.elements.form.removeAttribute("hidden");
        this.listen(this.elements.form, "submit", this.submit);
      })
      .catch((err) => {
        // TODO server error handling
      });
  };

  submit = (e) => {
    e.preventDefault();
    const name = this.elements.form["spot-name"].value;

    this.fetching(this.params.path + "/spot", "post", {
      name,
      ...this.location,
    })
      .then((response) => {
        this.reset();
        this.root.setAttribute("hidden", "");
        const spots = [...localStorage.getSpots(), response.result];
        console.log(spots);
        localStorage.setItem("spots", JSON.stringify(spots));
        this.dispatch(this.root, "_surfrate.spot.created");
      })
      .catch((err) => {});
  };

  reset = () => {
    this.elements.form.setAttribute("hidden", "");
    this.elements.message.removeAttribute("hidden");
  };
};
