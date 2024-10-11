import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import { fetchAReflection } from "../../../client/reflection";
import type { Reflection } from "../../../types/reflection";

export const ViewReflectionPage = () => {
  const [reflection, setReflection] = useState([] as Reflection[]);
  const { reflection_id_string } = useParams();
  const reflection_id = Number(reflection_id_string);

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
    if (!reflection_id || !userId) return;
    fetchReflection(userId, reflection_id);
  }, [userId, reflection_id]);

  return (
    <div>
      <h1>View Reflection</h1>
      {reflection && (
        <div>
          {reflection.map((reflection, index) => (
            <div key={index}>
              <h2>{reflection.title}</h2>
              <p>{reflection.whatMiss}</p>
              <p>{reflection.whyMiss}</p>
              <p>{reflection.preventMiss}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
