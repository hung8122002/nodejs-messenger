import * as express from "express";
import * as morgan from "morgan";

import { user } from "./routes";

const app = express();

app.use(morgan("tiny"));
app.use("/user", user);

export default app;
