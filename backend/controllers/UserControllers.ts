import e, { Request, Response } from "express";
import { Signup, Login } from "../model/Users";

export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("userのコントローラーが呼ばれました");
  const userData = req.body;
  console.log("userData: ", userData);

  if (userData) {
    await Signup(userData)
      .then((result) => {
        if (result.existingUser) {
          res.status(401).send("ユーザー名がすでに存在しています");
          return;
        } else {
          res.status(201).send(result.data);
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    res.send("userDataがありません");
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = req.body;
  if (userData) {
    await Login(userData)
      .then((result) => {
        if (!result) {
          res.status(401).send("ユーザー名またはパスワードが間違っています");
          return;
        }
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send("userDataがありません");
  }
};
