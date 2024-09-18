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
export const postUser = async (
  userData: inputUser
): Promise<getUser | null> => {
  console.log("Userのモデルが呼ばれました");
  //   TODO: user_nameはユニークにするので、userテーブルに同じuser_nameがないかを確認する処理をいれる
  const { data, error } = await supabase
    .from("users")
    .insert(userData)
    .single();
  if (error) {
    throw error;
  }
  return data ? (data as getUser) : null;
};
