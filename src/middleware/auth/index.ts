import * as jwt from "jsonwebtoken";

export default function (req, res, next) {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    req.data = decode;
    next();
  } catch (error) {
    res.status(401).json({
      messega: "Auth failed",
    });
  }
}
