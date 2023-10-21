_surfrate.components.Header = class Header extends _surfrate.components.Base {
  root;
  elements;
  params;

  constructor(root, elements, params) {
    super();

    this.root = root;
    this.elements = elements;
    this.params = params;

    this.listen(elements.login, "click", this.loginPopup);
    this.toggleLoginLogout();
    netlifyIdentity.on("login", this.getUserSpots);
    netlifyIdentity.on("logout", this.onLogout);
    if (localStorage.getItem("gotrue.user") && !localStorage.getItem("spots"))
      this.getUserSpots();
  }

  loginHandler = () => {
    this.toggleLoginLogout();
    this.getUserSpots();
  };

  getUserSpots = async () => {
    const result = await this.fetching(this.params.path + "/spot", "get").catch(
      (err) => {
        // TODO proper error handling
        console.log(err);
      }
    );
    localStorage.setItem("spots", JSON.stringify(result.detail));
    this.dispatch(this.root, "_surfrate.user.login");
  };

  onLogout = () => {
    this.dispatch(this.root, "_surfrate.user.logout");
    localStorage.removeItem("spots");
    this.toggleLoginLogout();
  };

  toggleLoginLogout = () => {
    const loggedIn = localStorage.getItem("gotrue.user") ? true : false;
    this.elements.login.textContent = loggedIn ? "Logout" : "login";
  };

  loginPopup = () => netlifyIdentity.open();
};
