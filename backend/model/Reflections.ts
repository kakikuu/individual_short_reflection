import { createClient } from "@supabase/supabase-js";
import type { getReflections } from "../types/reflection";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in env");
}
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// getする関数
export const getReflectionByReflectionId = async (reflectionId: string) => {
  const { data, error } = await supabase
    .from("reflections")
    .select("*")
    .eq("id", reflectionId);
  if (error) {
    throw error;
  }
  return data;
};

// insertする関数
export const createReflection = async (reflection: createReflection) => {
  const { data, error } = await supabase
    .from("reflections")
    .insert([reflection]);
  if (error) {
    throw error;
  }
  return data;
};
