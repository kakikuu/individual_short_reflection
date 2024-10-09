import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { fetchAReflection } from "../../../client/reflection";

export const ViewReflectionPage = async () => {
  // paramでreflection_idを取得
  const { reflection_id } = useParams();
  const { userId } = useAuth();
  if (!userId || !reflection_id) {
    return <div>ログインしてください</div>;
  }
  const result = await fetchAReflection(userId, reflection_id);

  console.log(result);
  return (
    <div>
      <h1>View Reflection</h1>
    </div>
  );
};
