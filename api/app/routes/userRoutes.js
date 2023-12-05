const userController = require("../controllers/userController");
const userModel = require("../models/userModel");

exports.userRoutes = (app) =>
  app.group("api/v1/user", (group) =>
    group
      .post("", userController.createUser, {
        //to base url
        body: userModel.user, //required body to make request
      })
      .get("", userController.getUser)
      .get("/jwt", userController.jwtToken)
  );
// .group("api/v1/user/jwt", (group) => group.get(""));
