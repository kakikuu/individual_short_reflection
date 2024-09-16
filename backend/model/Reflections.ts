import { createClient } from "@supabase/supabase-js";
import type { getReflections, inputReflection } from "../types/reflection";
import donev from "dotenv";

donev.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.log(process.env.SUPABASE_URL);
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in env");
}
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// getする関数
export const getReflectionByReflectionId = async (
  reflectionId: string
): Promise<getReflections[] | null> => {
  console.log("モデルが呼ばれました");
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .eq("id", reflectionId)
    .eq("user_id", "ef09b2be-829d-4131-b12a-c9df75955da7");
  if (error) {
    throw error;
  }
  return data;
};

// insertする関数
export const createReflection = async (
  reflection: inputReflection
): Promise<getReflections[] | null> => {
  const { data, error } = await supabase
    .from("reflections")
    .insert([reflection]);
  if (error) {
    throw error;
  }
  return data;
};
