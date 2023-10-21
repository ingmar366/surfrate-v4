const { t } = require("elysia");

exports.user = t.Object({
  email: t.String(),
});
