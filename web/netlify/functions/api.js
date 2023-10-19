import serverless from "serverless-http";
import api from "./api/app";

export const handler = serverless(api);
