import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    req.body.data = decode;
    next();
  } catch (error) {
    res.status(401).json({
      messega: "Auth failed",
    });
  }
}
