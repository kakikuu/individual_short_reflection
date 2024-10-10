import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { fetchAReflection } from "../../../client/reflection";

export const ViewReflectionPage = () => {
  // paramでreflection_idを取得
  const { reflection_id_string } = useParams();
  const reflection_id = Number(reflection_id_string);

  const { userId } = useAuth();

  const fetchReflection = async (userId: string, reflection_id: number) => {
    if (!reflection_id || !userId) return;
    const result = await fetchAReflection(userId, reflection_id);
    console.log(result);
  };

  useEffect(() => {
    if (!reflection_id || !userId) return;
    fetchReflection(userId, reflection_id);
  }, [userId, reflection_id]);

  return (
    <div>
      <h1>View Reflection</h1>
    </div>
  );
};
