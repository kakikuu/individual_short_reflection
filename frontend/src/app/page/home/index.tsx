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

  const navReflection = (reflectionId: number) => () => {
    console.log("reflectionId", reflectionId);
    navigate(`/view/${reflectionId}`);
  };

  const fetchTitles = async (userId: string) => {
    try {
      const result = await fetchReflectionContents(userId);
      setReflections(result?.data || []);
    } catch (err) {
      setError("データの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/"); // ログインページにリダイレクト（例: "/"）
    } else {
      fetchTitles(userId); // データ取得
    }
  }, [userId, navigate]);

  if (loading) {
    return <div>ローディング中</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8 mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold mb-4">越えてきた屍のすべて</h1>
      <div className="grid grid-cols-3 gap-6">
        {reflections.length > 0 ? (
          reflections.map((reflection, index) => (
            <div
              key={index}
              className="bg-gray-200 p-8 rounded-md shadow-md text-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (reflection.id) {
                  console.log("reflection.id", reflection.id);
                  navReflection(reflection.id)();
                }
              }}
            >
              <h2 className="font-bold text-lg">{reflection.title}</h2>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            反省タイトルがありません
          </div>
        )}
      </div>
    </div>
  );
};
