// TODO:ログイン済みであるかを判定する処理を追加する
// ルーティングがhomeだけだと、URLを入力しただけでこのページにアクセスできてしまう
// 内容を見られたくないから、ログインしているかしていないかの情報を内部で管理したい
import { useAuth } from "../../../context/AuthContext";
import { fetchReflectionTitle } from "../../../client/reflection";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const { userId } = useAuth();
  const [reflectionTitles, setReflectionTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      throw new Error("ユーザーIDが存在しません");
    }
    const fetchTitles = async () => {
      try {
        const result = await fetchReflectionTitle(userId);
        setReflectionTitles(result?.data || []); // データをstateに保存
      } catch (err) {
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, [userId]);

  if (loading) {
    return <div>ローディング中</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (reflectionTitles.length === 0) {
    return <div>反省がありません</div>;
  }

  return (
    <div>
      <h1>ホームページ</h1>
      <h2>反省タイトル</h2>
      <ul>
        {reflectionTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};
