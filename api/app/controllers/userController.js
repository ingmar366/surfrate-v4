const User = require("../schemas/userSchema");

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
