const { Elysia } = require("elysia");
const { userRoutes } = require("./routes/userRoutes");
const { spotRoutes } = require("./routes/spotRoutes");
const { lambda } = require("elysia-lambda");

const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log(`DB connection succesful!`);
  });

const handler = new Elysia();
handler
  .use(lambda())

  .use(userRoutes)
  .use(spotRoutes)
  .get("/", ({ set }) => {
    set.status = 200;
    return {
      status: "success",
      message: "Hello Elysia",
    };
  })
  .get("", ({ set }) => {
    set.status = 200;
    return {
      status: "success",
      message: "Hello Elysia",
    };
  })
  .listen(3000);

export default { handler };
