import { Request, Response } from "express";
import {
  getReflectionByReflectionId,
  createReflection,
  getAllReflection,
} from "../model/Reflections";

// 入力に対して、DBの結果を返す
export const getAllReflectionsController = (req: Request, res: Response) => {
  console.log("reflectionsのController");
  const userId = req.body.user_id;
  console.log("userId", userId);
  if (userId) {
    getAllReflection(userId as string)
      .then((result) => {
        console.log("result", result);
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  }
};

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
  const convertedReflectionContent = {
    id: undefined,
    user_id: reflectionContent.userId,
    title: reflectionContent.title,
    what_miss: reflectionContent.whatMiss,
    why_miss: reflectionContent.whyMiss,
    prevent_miss: reflectionContent.preventMiss,
    created_at: undefined,
  };

  if (convertedReflectionContent) {
    createReflection(convertedReflectionContent)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        // TODO: このcatchで拾えるエラーについて調べる
        res.send(error);
      });
  } else {
    res.send("bodyが未指定です");
  }
};
