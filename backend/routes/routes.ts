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
import { jwtHelper } from "../helper/jwtHelper";
import cors from "cors";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(cors());

// 必要に応じて詳細なオプションを追加
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE", // 許可するHTTPメソッド
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(cookieParser());
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
  const jwtToken = jwtHelper.createToken();
  return res.cookie("jwtToken", jwtToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
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

app.get("/tokenVerification", (req: Request, res: Response, next) => {
  let token = "";
  console.log("req.cookies", req.cookies);
  if (req.cookies.jwtToken) {
    token = req.cookies.jwtToken;
  } else {
    return res.status(200).json({ isAuthenticated: false });
  }
  const decode = jwtHelper.verifyToken(token);
  if (decode) {
    const token = jwtHelper.createToken({
      id: decode.id,
      username: decode.username,
    });
    res.cookie("jwtToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return res.status(200).json({ isAuthenticated: true });
  }
});

app.listen(PORT, () => {
  console.log(`server listen Port ${PORT}`);
});
