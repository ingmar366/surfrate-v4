const { t } = require("elysia");

exports.spotValidation = t.Object({
  lat: t.Number(),
  lng: t.Number(),
});

exports.createSpot = t.Object({
  name: t.String(),
  lat: t.Number(),
  lng: t.Number(),
});
