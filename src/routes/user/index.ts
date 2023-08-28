import * as express from "express";
const route = express.Router();
route.get("/", (req, res) => {
  res.status(200).json({
    message: "Handling get request",
  });
});

route.post("/", (req, res) => {
  const user = {
    userName: req.body.userName,
    password: req.body.password,
  };
  res.status(200).json({
    message: "Handling post request",
    user,
  });
});

route.get("/:userId", (req, res) => {
  res.status(200).json({
    message: `Id is ${req.params.userId}`,
  });
});

export default route;
