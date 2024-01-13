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

    this.listen(document.body, "_surfrate.user.login", () => {
      this.root.dataset.visible = "spots";
    });
    this.listen(
      document.body,
      "_surfrate.user.logout",
      () => (this.root.visible = "general")
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
};
