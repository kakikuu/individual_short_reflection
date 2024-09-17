import express from "express";
import { getReflectionController } from "../controllers/ReflectionControllers";

const app = express();

const PORT = 3000;

app.get("/:user_id/:reflection_id", (req, res) => {
  console.log("get /が呼ばれました");
  const userId = req.params.user_id;
  const reflectionId = req.params.reflection_id;
  getReflectionController(res, userId, reflectionId);
});

app.get("/:user_id/create_reflection/");

app.listen(PORT, () => {
  console.log(`server listen Port ${PORT}`);
});
