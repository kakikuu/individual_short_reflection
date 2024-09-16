import express from "express";
import { getReflectionController } from "../controllers/ReflectionControllers";

const app = express();

const PORT = 3000;

app.get("/:id", (req, res) => {
  console.log("get /が呼ばれました");
  const reflectionId = req.params.id;
  getReflectionController(res, reflectionId);
});

app.listen(PORT, () => {
  console.log(`server listen Port ${PORT}`);
});
