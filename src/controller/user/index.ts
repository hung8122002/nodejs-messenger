import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";

import { User } from "~/model";
const user_paging = (req: Request, res: Response) => {
  User.find()
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
          email: user.email,
          subname: user.subname,
          firstname: user.firstname,
          detail: `http://localhost:3000/user/${user._id}`,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Get user failed", error: err.message });
    });
};

const user_login = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jsonwebtoken.sign(
            {
              id: user._id,
            },
            process.env.JWT_KEY
          );
          return res.status(200).json({ message: "Auth successful", token });
        }
      }
      res.status(401).json({ message: "Auth failed" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

const user_signup = (req: Request, res: Response) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length) {
      return res.status(409).json({ message: "Email already exists" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            subname: req.body.subname,
          });
          user
            .save()
            .then(() => {
              res.status(200).json({
                message: "Create new user successfully",
                user: {
                  email: user.email,
                  subname: user.subname,
                  firstname: user.firstname,
                  detail: `http://localhost:3000/user/${user._id}`,
                },
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Create new user failed",
                error: err.message,
              });
            });
        }
      });
    }
  });
};

const user_delete = (req: Request, res: Response) => {
  User.deleteOne({ _id: req.params.userId })
    .then((result) => {
      res.status(200).json(result.deletedCount);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const user_update_by_id = (req: Request, res: Response) => {
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
};

const user_get_by_id = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export {
  user_paging,
  user_login,
  user_signup,
  user_delete,
  user_update_by_id,
  user_get_by_id,
};
