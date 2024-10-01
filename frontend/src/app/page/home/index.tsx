// TODO:ログイン済みであるかを判定する処理を追加する
// ルーティングがhomeだけだと、URLを入力しただけでこのページにアクセスできてしまう
// 内容を見られたくないから、ログインしているかしていないかの情報を内部で管理したい
import { useAuth } from "../../../context/AuthContext";
export const HomePage = () => {
  const { userId } = useAuth();
  console.log(userId);
  return <h1>ホーム</h1>;
};
