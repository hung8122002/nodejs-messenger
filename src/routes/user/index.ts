import * as express from "express";
import mongoose from "mongoose";
import * as multer from "multer";

import { User } from "../../model";

const route = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.minetype === "image/jpeg" || file.minetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

route.get("/", (req, res) => {
  User.find()
    .select("username password")
    .skip(Number(req.query.skip))
    .limit(Number(req.query.limit))
    .sort("-updateAt")
    .then(async (users) => {
      res.status(200).json({
        total: await User.countDocuments(),
        skip: req.query.skip,
        limit: req.query.limit,
        record: users.length,
        users: users.map((user) => ({
          username: user.username,
          subname: user.subname,
          firstname: user.firstname,
          detail: `http://localhost:3000/user/${user._id}`,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Get user failed", error: err.message });
    });
});

route.post("/", (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      res.status(200).json({
        message: "Create new user successfully",
        user,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Create new user failed", error: err.message });
    });
});

route.delete("/:userId", (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .then((result) => {
      res.status(200).json(result.deletedCount);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

route.put("/:userId", upload.single("avatar"), (req, res) => {
  console.log(req.file.path);
  let updateItem = {};
  for (const propName in req.body) {
    updateItem[propName] = req.body[propName];
  }
  User.findByIdAndUpdate(req.params.userId, updateItem)
    .then((result) => {
      res.status(200).json(result ? 1 : 0);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

route.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export default route;
