exports.validateToken = async (token, jwt) => {
  const decode = await jwt.verify(token);
  const email = Object.entries(decode).reduce((acc, [key, value]) => {
    if (key == "exp") return acc;
    return acc + value;
  }, "");
  const currentTime = Math.floor(Date.now() / 1000);
  const validTime = decode.exp - currentTime > 0;
  return {
    user: email,
    valid: validTime,
  };
};
