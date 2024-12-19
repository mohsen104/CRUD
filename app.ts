import express, { type Application } from "express";
import NotFoundHandler from "./src/common/exceptions/not-found.handler.js";
import AllExceptionHandler from "./src/common/exceptions/all-exception.handler.js";
import ConnectedToMongodb from "./src/common/configs/mongodb.config.js";

const app: Application = express();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ConnectedToMongodb(url);

NotFoundHandler(app);
AllExceptionHandler(app);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
