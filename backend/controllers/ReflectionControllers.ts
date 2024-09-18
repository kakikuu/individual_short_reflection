import { Request, Response } from "express";
import {
  getReflectionByReflectionId,
  createReflection,
} from "../model/Reflections";

// 入力に対して、DBの結果を返す
export const getReflectionController = (
  res: Response,
  userId: string,
  reflectionId: string
) => {
  console.log("Controllerが呼ばれました");
  if (reflectionId) {
    getReflectionByReflectionId(userId as string, reflectionId as string)
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
  console.log("controllers", req.body);
  const reflectionContent = req.body;

  if (reflectionContent) {
    createReflection(reflectionContent)
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
