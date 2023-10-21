const User = require("../schemas/userSchema");
const jwt_decode = require("jwt-decode");

/**
 * @param {*} param basic request params
 * @returns set the setheaders to the user id if found. If user not found or token invalid returns error
 */
// exports.userExist = async ({ set, request: { headers } }) => {
exports.userExist = async ({ headers, set }) => {
  const token = headers?.authorization?.slice(7);
  if (!token) return unauthorized(set);
  const decodedToken = jwt_decode(token);
  // if (decodedToken.exp < Date.now()) return unauthorized(set);// TODO set when tokens are live

  const { _id: id } = await User.findOne({ email: decodedToken.email })
    .select("_id")
    .lean();

  if (!id) {
    set.status = 404;
    return {
      status: "failed",
      messsage: "User not found",
    };
  }
  set.headers["user_id"] = id.toString();
};

const unauthorized = (set) => {
  set.status = 401;
  return {
    status: "failed",
    message: "Unauthorized",
  };
};
