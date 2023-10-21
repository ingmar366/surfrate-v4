const spotController = require("../controllers/spotController");
const authorization = require("../utils/authorization");
const spotModel = require("../models/spotModel");

//   .group("api/v1/spot", spotRoutes)

exports.spotRoutes = (app) =>
  app.group("api/v1/spot", (group) =>
    group
      .post("", spotController.createSpot, {
        beforeHandle: authorization.userExist,
        body: spotModel.createSpot,
      })
      .get("", spotController.getAllSpots, {
        beforeHandle: authorization.userExist,
      })
      .post("/valid", spotController.valid, {
        beforeHandle: authorization.userExist,
        body: spotModel.spotValidation,
      })
  );
