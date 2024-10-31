import e, { Request, Response } from "express";
import { Signup, Login } from "../model/Users";
import { jwtHelper } from "../helper/jwtHelper";

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
          const jwtToken = jwtHelper.createToken();
          // res.status(201).send(result.data);
          return res
            .status(201)
            .cookie("jwtToken", jwtToken, {
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            })
            .send(result.data);
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
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
        const jwtToken = jwtHelper.createToken();
        res
          .cookie("jwtToken", jwtToken, {
            //webサーバーのみがアクセス可能
            httpOnly: true,
            //cookieの有効期限は2日間に設定
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
          })
          .send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send("userDataがありません");
  }
};
