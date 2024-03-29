_surfrate.components.Header = class Header extends _surfrate.components.Base {
  root;
  elements;
  params;
  auth0Client;

  constructor(root, elements, params) {
    super();
    this.root = root;
    this.elements = elements;
    this.params = params;

    netlifyIdentity.on("login", this.getUserSpots);
    netlifyIdentity.on("logout", this.onLogout);
  }

  getUserSpots = async () => {
    const result = await this.fetching(this.params.path + "/spot", "get").catch(
      async (err) => {
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
    // this.elements.login.textContent = loggedIn ? "Logout" : "login";
  };
};
