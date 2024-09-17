import express from "express";
import {
  getReflectionController,
  createReflectionController,
} from "../controllers/ReflectionControllers";

const app = express();
const PORT = 3000;

// JSON形式のリクエストボディをパースするためのミドルウェア
app.use(express.json());

// URLエンコードされたデータのパース
app.use(express.urlencoded({ extended: true }));

// routerではパスから受け取るだけ

// TODO:userIdの渡し方がjsonかクエリパラメータかは統一するべきかを検討する
app.get("/:user_id/:reflection_id", (req, res) => {
  console.log("get /が呼ばれました");
  const userId = req.params.user_id;
  const reflectionId = req.params.reflection_id;
  getReflectionController(res, userId, reflectionId);
});

app.post("/create_reflection/", (req, res) => {
  // userIdはbodyの中で送られてくるからパスでは受け取らない
  console.log("postが呼ばれました");
  console.log("routeのbody", req.body);
  createReflectionController(req, res);
});

app.listen(PORT, () => {
  console.log(`server listen Port ${PORT}`);
});
