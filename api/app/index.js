const { Elysia } = require("elysia");
const { userRoutes } = require("./routes/userRoutes");
const { spotRoutes } = require("./routes/spotRoutes");
const { cors } = require("@elysiajs/cors");
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
  .use(cors())

  .use(userRoutes)
  .use(spotRoutes)
  .get("/", () => "Hello Elysia")
  .get("", () => "Hello Elysia")
  .listen(3000);

export default { handler };
