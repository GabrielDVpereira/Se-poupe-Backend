import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'; 

export default function(req: Request, res: Response, next:NextFunction) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY!);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).send("Access denied. invalid token provided");
  }
};
