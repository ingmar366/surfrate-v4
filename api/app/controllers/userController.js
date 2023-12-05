const User = require("../schemas/userSchema");
const { validateToken } = require("../utils/jwt");

exports.createUser = async ({ set, body }) => {
  try {
    const user = await User.create(body);
    return {
      status: "succes",
      result: user,
    };
  } catch (err) {
    set.status = 400;
    return {
      status: "failed",
      result: err,
    };
  }
};

exports.getUser = (context) => {
  console.log(context);
  return "hello";
};

exports.jwtToken = async ({ jwtToken }) => {
  const token = await jwtToken.sign("ingmar.m.meijer@gmail.com");
  validateToken(token, jwtToken);
};
