const { Elysia } = require("elysia");
const { userRoutes } = require("./routes/userRoutes");
const { spotRoutes } = require("./routes/spotRoutes");
const { lambda } = require("elysia-lambda");
const { jwt } = require("@elysiajs/jwt");

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
  .then(() => {
    console.log(`DB connection succesful!`);
  });

const handler = new Elysia();
handler
  .use(lambda())
  .use(
    jwt({
      name: "jwtToken",
      secret: process.env.JWT_SECRET,
      exp: "7d",
    })
  )
  .use(userRoutes)
  .use(spotRoutes)
  .get("/", ({ set }) => {
    set.status = 200;
    return {
      status: "success",
      message: "Hello Elysia",
    };
  })
  // TODO maybe unneeded?
  // .get("", ({ set }) => {
  //   set.status = 200;
  //   return {
  //     status: "success",
  //     message: "Hello Elysia",
  //   };
  // })
  .listen(3000);

export default { handler };
