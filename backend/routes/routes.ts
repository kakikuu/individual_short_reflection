import express, { NextFunction } from "express";
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
import { authenticateToken } from "../middleware/authenticateToken";

const app = express();
const PORT = 3000;

// 必要に応じて詳細なオプションを追加
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "https://individual-short-reflection-j0y4l8233-kakikuus-projects.vercel.app",
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
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

app.get("/reflection", authenticateToken, (req: Request, res: Response) => {
  console.log("all reflectionのgetが呼ばれました");
  getAllReflectionsController(req, res);
});

// TODO:userIdの渡し方がjsonかクエリパラメータかは統一するべきかを検討する
app.get(
  "/user/:user_id/reflection/:reflection_id",
  authenticateToken,
  (req: Request, res: Response) => {
    console.log("get /が呼ばれました");
    console.log("req.params", req.params);
    // const userId = req.params.user_id;
    const reflectionId = req.params.reflection_id;
    getReflectionController(res, reflectionId);
  }
);

app.post(
  "/reflection/create",
  authenticateToken,
  (req: Request, res: Response) => {
    console.log("postが呼ばれました");
    console.log("routeのbody", req.body);
    createReflectionController(req, res);
  }
);

app.get(
  "/tokenVerification",
  authenticateToken,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send("You are not authenticated");
    }
    const token = jwtHelper.createToken(req.user as string);
    res.cookie("jwtToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return res.status(200).json({ isAuthenticated: true });
  }
);

app.listen(PORT, () => {
  console.log(`server listen Port ${PORT}`);
});
