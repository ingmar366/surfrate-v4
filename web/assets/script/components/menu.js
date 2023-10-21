_surfrate.components.Menu = class Menu extends _surfrate.components.Base {
  root;
  elements;
  params;

  constructor(root, elements, params) {
    super();

    this.root = root;
    this.elements = elements;
    this.params = params;

    this.listen(elements.controll, "click", this.menuControll);

    localStorage.getSpots().then((res) => res && this.toggleInformation());

    setTimeout(
      () =>
        this.listen(
          document.body,
          ["_surfrate.user.login", "_surfrate.user.logout"],
          this.toggleInformation
        ),
      100
    );
  }

  menuControll = () => {
    if (this.root.dataset.state == "closed") {
      this.root.dataset.state = "open";
      return;
    }
    if (this.root.dataset.state == "open") {
      this.root.dataset.state = "closing";
      setTimeout(() => {
        this.root.dataset.state = "closed";
      }, 400);
    }
  };

  toggleInformation = () => {
    this.elements.information.toggleAttribute("hidden");
  };
};
