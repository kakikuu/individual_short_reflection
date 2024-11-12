import { Request, Response, NextFunction } from "express";
import { jwtHelper } from "../helper/jwtHelper";
import { Jwt, JwtPayload } from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwtToken;
  // console.log("req.cookies", req.cookies);
  console.log("token", token);
  if (!token) {
    return res.status(401).send("ミドルウェア内：You are not authenticated");
  }
  const verified = jwtHelper.verifyToken(token);
  if (!verified) {
    return res.status(401).send("You are not authenticated");
  }

  req.user = verified as JwtPayload;
  next();
};
