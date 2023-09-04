import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

import { user } from "./routes";
import { CustomError } from "./interface";

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", user);
app.use((req: Request, res: Response, next) => {
  const error: CustomError = new Error("Not Found") as CustomError;
  error.status = 404;
  next(error);
});

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
      status: error.status,
      message: error.message,
    });
  }
);

export default app;
