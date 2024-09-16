import { Request, Response } from "express";
import {
  getReflectionByReflectionId,
  createReflection,
} from "../model/Reflections";

// 入力に対して、DBの結果を返す
export const getReflectionController = (
  res: Response,
  reflectionId: string
) => {
  console.log("Controllerが呼ばれました");
  if (reflectionId) {
    getReflectionByReflectionId(reflectionId as string)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send("idが未指定です");
  }
};

export const createReflectionController = (req: Request, res: Response) => {
  if (req.body) {
    createReflection(req.body.data)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send("bodyが未指定です");
  }
};
