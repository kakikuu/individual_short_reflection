import { createClient } from "@supabase/supabase-js";
import type { getUser, inputUser } from "../types/user";
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
export const Signup = async (userData: inputUser): Promise<getUser | null> => {
  // data: existingUserはエイリアスの書き方
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("user_name", userData.user_name);

  if (checkError) {
    // クエリエラーの確認
    throw checkError;
  }

  if (existingUser) {
    return null;
  }

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert(userData)
    .single();

  if (insertError) {
    throw insertError;
  }
  return newUser ? (newUser as getUser) : null;
};

export const Login = async (userData: inputUser): Promise<getUser | null> => {
  console.log("Loginが呼ばれました");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_name", userData.user_name)
    .eq("password", userData.password)
    .single();
  console.log(data);
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  if (error) {
    throw error;
  }
  return data;
};
