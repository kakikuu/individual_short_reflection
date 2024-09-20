import express from "express";
import {
  getReflectionController,
  createReflectionController,
} from "../controllers/ReflectionControllers";
import {
  signupController,
  loginController,
} from "../controllers/UserControllers";

const app = express();
const PORT = 3000;

// JSON形式のリクエストボディをパースするためのミドルウェア
app.use(express.json());

// URLエンコードされたデータのパース
app.use(express.urlencoded({ extended: true }));

// routerではパスから受け取るだけ
app.post("/login", (req, res) => {
  console.log("loginが呼ばれました");
  loginController(req, res);
});

app.post("/signup", (req, res) => {
  console.log("signupが呼ばれました");
  signupController(req, res);
});

// TODO:userIdの渡し方がjsonかクエリパラメータかは統一するべきかを検討する
app.get("/:user_id/reflection/:reflection_id", (req, res) => {
  // 各反省を一つずつ取得する
  console.log("get /が呼ばれました");
  const userId = req.params.user_id;
  const reflectionId = req.params.reflection_id;
  getReflectionController(res, userId, reflectionId);
});

app.post("/:user_id/reflection/:reflection_id/", (req, res) => {
  // userIdはbodyの中で送られてくるからパスでは受け取らない
  console.log("postが呼ばれました");
  console.log("routeのbody", req.body);
  createReflectionController(req, res);
});

app.listen(PORT, () => {
  console.log(`server listen Port ${PORT}`);
});
