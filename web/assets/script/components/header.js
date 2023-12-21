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

    // this.getConfig();

    // this.toggleLoginLogout();
    // console.log(supertokens.init);

    supertokens.init({
      // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
      apiDomain: "http://localhost:3000",
    });

    // netlifyIdentity.on("login", this.getUserSpots);
    // netlifyIdentity.on("logout", this.onLogout);
    // if (localStorage.getItem("gotrue.user") && !localStorage.getItem("spots"))
    // this.getUserSpots();
  }

  loginHandler = () => {
    this.toggleLoginLogout();
    // this.getUserSpots();
  };

  getConfig = async () => {
    const config = await fetch("/auth_config.json").then((res) => res.json());
    this.auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId,
    });
    this.listen(this.elements.login, "click", this.loginUser);

    const url = new URLSearchParams(window.location.search);
    console.log(url.get("state"));
    if (url.get("state")) {
      const res = await this.auth0Client.handleRedirectCallback();
      console.log(res);
    }
    return;
  };

  loginUser = () => {
    this.auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}`,
      },
    });
  };

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
    this.elements.login.textContent = loggedIn ? "Logout" : "login";
  };
};
