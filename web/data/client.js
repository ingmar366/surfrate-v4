// sanity.js
require("dotenv").config();
const { createClient } = require("@sanity/client");

exports.client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-11-02",
  token: process.env.SANITY_SECRET_TOKEN,
});
