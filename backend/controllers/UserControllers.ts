import { Request, Response } from "express";
import { postUser } from "../model/Users";

export const postUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("userのコントローラーが呼ばれました");
  const userData = req.body;

  if (userData) {
    await postUser(userData)
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
