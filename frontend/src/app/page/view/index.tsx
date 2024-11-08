import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAReflection } from "../../../client/reflection";
import type { Reflection } from "../../../types/reflection";

export const ViewReflectionPage = () => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState<Reflection | undefined>(
    undefined
  );

  const { reflection_id } = useParams();
  const reflection_id_num = Number(reflection_id);
  const { userId } = useAuth();

  const fetchReflection = async (userId: string, reflection_id: number) => {
    if (!reflection_id || !userId) return;

    const result = await fetchAReflection(userId, reflection_id);

    if (!result.success) {
      console.log("エラー");
      return;
    }
    setReflection(result.data);
    console.log(result);
  };

  useEffect(() => {
    if (!reflection_id_num || !userId) return;
    fetchReflection(userId, reflection_id_num);
  }, [userId, reflection_id_num]);

  return (
    <div className="mt-8 mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">越えてきた屍 - 詳細</h1>

      {reflection && (
        <div>
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="font-bold">頭から離れなかった後悔</p>
              <h2 className="font-bold text-xl">{reflection.title}</h2>
            </div>
            <div className="text-right">
              <p className="font-bold">越えた日: {reflection.createdAt}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="font-bold">どんな行動を取ったのか</p>
            <p className="bg-gray-100 p-4">{reflection.whatMiss}</p>
          </div>

          <div className="mb-8">
            <p className="font-bold">その行動の結果どんな気持ちになったのか</p>
            <p className="bg-gray-100 p-4">{reflection.whyMiss}</p>
          </div>

          <div className="mb-8">
            <p className="font-bold">どうするのが理想だったのか</p>
            <p className="bg-gray-100 p-4">{reflection.preventMiss}</p>
          </div>
        </div>
      )}
    </div>
  );
};
