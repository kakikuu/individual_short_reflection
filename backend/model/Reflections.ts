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

export const getAllReflection = async (
  userId: string
): Promise<string[] | null> => {
  const { data, error } = await supabase
    .from("memos")
    .select("title")
    .eq("user_id", userId)
    .select();
  if (error) {
    throw error;
  }
  if (data === null) {
    return [];
  }
  return data;
};

export const getReflectionByReflectionId = async (
  userId: string,
  reflectionId: string
): Promise<getReflections[] | null> => {
  console.log("モデルが呼ばれました");
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .eq("id", reflectionId)
    .eq("user_id", userId)
    .select();
  console.log("data", data);
  if (error) {
    throw error;
  }
  return data;
};

export const createReflection = async (
  reflection: inputReflection
): Promise<getReflections[] | null> => {
  console.log("reflection", reflection);
  const { data, error } = await supabase
    .from("memos")
    .insert(reflection)
    .select("*");
  console.log(data, "data");
  if (error) {
    throw error;
  }
  return data;
};
