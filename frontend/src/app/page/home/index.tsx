// TODO:ログイン済みであるかを判定する処理を追加する
// ルーティングがhomeだけだと、URLを入力しただけでこのページにアクセスできてしまう
// 内容を見られたくないから、ログインしているかしていないかの情報を内部で管理したい
import { useAuth } from "../../../context/AuthContext";
import { fetchReflectionTitle } from "../../../client/reflection";
import { useState, useEffect } from "react";

interface Reflection {
  title: string;
  whatMiss: string;
  whyMiss: string;
  preventMiss: string;
  createdAt: string;
}

export const HomePage = () => {
  const { userId } = useAuth();
  console.log("userId", userId);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTitles = async (userId: string) => {
    try {
      const result = await fetchReflectionTitle(userId);
      console.log("result3", result?.data);
      setReflections(result?.data || []);
    } catch (err) {
      setError("データの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchTitles(userId);
  }, [userId]);

  useEffect(() => {
    console.log("reflections", reflections);
  }, [reflections]);

  if (loading) {
    return <div>ローディング中</div>;
  }
  if (error) {
    console.log("reflections", reflections);
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>ホームページ</h1>
      <h2>反省タイトル</h2>
      <ul>
        {reflections.length > 0 ? (
          reflections.map((reflection, index) => (
            <li key={index}>{reflection.title}</li>
          ))
        ) : (
          <li>反省タイトルがありません</li>
        )}
      </ul>
    </div>
  );
};
