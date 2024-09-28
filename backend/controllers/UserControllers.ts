import { Request, Response } from "express";
import { Signup, Login } from "../model/Users";

export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("userのコントローラーが呼ばれました");
  const userData = req.body;

  if (userData) {
    await Signup(userData)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
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
        console.log("hogehoghoge");
        if (!result) {
          res.status(401).send("ユーザー名またはパスワードが間違っています");
          return;
        }
        res.send(result);
      })
      .catch((error) => {
        console.log("aaaaaaa");
        res.send(error);
      });
  } else {
    res.send("userDataがありません");
  }
};
