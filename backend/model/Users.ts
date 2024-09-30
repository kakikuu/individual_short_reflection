import { createClient } from "@supabase/supabase-js";
import type { getUser, inputUser, checkUserName } from "../types/user";
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
export const Signup = async (userData: inputUser): Promise<checkUserName> => {
  // data: existingUserはエイリアスの書き方
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("user_name", userData.user_name)
    .maybeSingle();
  // singleを使うと、0行が返ってきたときにエラーになるから0行の場合でも対応できるようにmarbeSingleを使う

  console.log("exist user: ", existingUser);

  if (checkError) {
    // クエリエラーの確認
    throw checkError;
  }

  if (existingUser !== null) {
    return {
      existingUser: true,
      data: existingUser,
    };
  }

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert(userData)
    .select("*");

  if (insertError) {
    console.log("insertError");
    throw insertError;
  }
  return {
    existingUser: false,
    data: newUser ? (newUser[0] as getUser) : null,
  };
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
