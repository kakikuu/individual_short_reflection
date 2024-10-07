// TODO:ログイン済みであるかを判定する処理を追加する
// ルーティングがhomeだけだと、URLを入力しただけでこのページにアクセスできてしまう
// 内容を見られたくないから、ログインしているかしていないかの情報を内部で管理したい
import { useAuth } from "../../../context/AuthContext";
import { fetchReflectionContents } from "../../../client/reflection";
import { useState, useEffect } from "react";
import type { Reflection } from "../../../types/reflection";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navCreatePage = () => {
    navigate("/create");
  };

  const fetchTitles = async (userId: string) => {
    try {
      const result = await fetchReflectionContents(userId);
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

  if (loading) {
    return <div>ローディング中</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>ホームページ</h1>
      <p onClick={navCreatePage}>反省する</p>
      <h2>反省タイトル</h2>
      <ul>
        {reflections.length > 0 ? (
          reflections.map((reflection, index) => (
            <li key={index}>{reflection.title}</li>
          ))
        ) : (
          // ログインやサインアップとは違って、反省がないということはエラーではなくて、事実だから、BE側でエラーを返すよりはFEで処理するほうが良いと考えた
          <li>反省タイトルがありません</li>
        )}
      </ul>
    </div>
  );
};
