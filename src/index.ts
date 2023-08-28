import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { user } from "./routes";

const app = express();

interface CustomError extends Error {
  status: number;
}

app.use(cors);
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", user);
app.use((req, res, next) => {
  const error: CustomError = new Error("Not Found") as CustomError;
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
  });
});

export default app;
