import { Request, Response } from "express";
import {
  getReflectionByReflectionId,
  createReflection,
  getAllReflection,
} from "../model/Reflections";

// 入力に対して、DBの結果を返す
export const getAllReflectionsController = (req: Request, res: Response) => {
  console.log("reflectionsのController");
  console.log("req.user", req.user);
  if (req.user && typeof req.user !== "string") {
    console.log("req.user", req.user);
    // const userPayload = req.user as CustomJwtPayload;

    // // ネストされた userId を取り出す
    // const userIdDetails = userPayload.userId.userId; // 最も内側の userId オブジェクト

    // 必要な情報を userId オブジェクトから取得
    // 例: この例では userId は string 型として扱っています
    // const innerUserId = userIdDetails.userId;

    // console.log("UserId:", innerUserId);
  }

  const userId = (req.user as any).user_id;
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
  reflectionId: string
) => {
  console.log("Controllerが呼ばれました");
  const userId = (res.req as any).user.user_id;
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
  const userId = (req.user as any).user_id;
  const convertedReflectionContent = {
    id: undefined,
    user_id: userId,
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
