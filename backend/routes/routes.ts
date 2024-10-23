import express from "express";
import {
  getReflectionController,
  createReflectionController,
  getAllReflectionsController,
} from "../controllers/ReflectionControllers";
import {
  signupController,
  loginController,
} from "../controllers/UserControllers";
import cors from "cors";
import { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(cors());

// 必要に応じて詳細なオプションを追加
app.use(
  cors({
    origin: "*", // すべてのオリジンを許可、特定のドメインを指定することも可能
    methods: "GET,POST,PUT,DELETE", // 許可するHTTPメソッド
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// JSON形式のリクエストボディをパースするためのミドルウェア
app.use(express.json());

// URLエンコードされたデータのパース
app.use(express.urlencoded({ extended: true }));

// routerではパスから受け取るだけ
app.post("/login", (req: Request, res: Response) => {
  console.log("loginが呼ばれました");
  loginController(req, res);
});

app.post("/signup", (req: Request, res: Response) => {
  console.log("signupが呼ばれました");
  signupController(req, res);
});

app.post("/reflection", (req: Request, res: Response) => {
  console.log("all reflectionのgetが呼ばれました");
  getAllReflectionsController(req, res);
});

// TODO:userIdの渡し方がjsonかクエリパラメータかは統一するべきかを検討する
app.get(
  "/user/:user_id/reflection/:reflection_id",
  (req: Request, res: Response) => {
    console.log("get /が呼ばれました");
    console.log("req.params", req.params);
    const userId = req.params.user_id;
    const reflectionId = req.params.reflection_id;
    getReflectionController(res, userId, reflectionId);
  }
);

app.post("/reflection/create", (req: Request, res: Response) => {
  console.log("postが呼ばれました");
  console.log("routeのbody", req.body);
  createReflectionController(req, res);
});

app.listen(PORT, () => {
  console.log(`server listen Port ${PORT}`);
});
