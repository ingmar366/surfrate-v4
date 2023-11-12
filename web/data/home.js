const { client } = require("./client");
const helpers = require("./helpers");
module.exports = async () => {
  console.log(client);
  const query = `*[_type == "home"]`;
  const data = await client.fetch(query).then((res) => helpers.reducer(res[0]));
  return {
    title: "surfrate",
    ...data,
  };
};
