import express, { Router } from "express";
require("dotenv").config();
import Product from "./models/productModel";
import connectDb from "./db/connectDb";

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

connectDb(DB);

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get("/write", async (req, res) => {
  await Product.create({
    name: "ingmar",
    id: "1-2-3",
  });
  res.send("succes");
});

api.use("/api/", router);

module.exports = api;
