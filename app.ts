import express, { type Application } from "express";
import NotFoundHandler from "@exceptions/not-found.handler.js";
import AllExceptionHandler from "@exceptions/all-exception.handler.js";
import ConnectedToMongodb from "@configs/mongodb.config.js";
import { setupRoutes } from "./src/index.routes.js";

const app: Application = express();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ConnectedToMongodb(url);

setupRoutes(app);

NotFoundHandler(app);
AllExceptionHandler(app);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
