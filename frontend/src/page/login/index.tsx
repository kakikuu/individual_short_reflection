import { useState } from "react";
export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("投稿しました");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username, // フィールド名をバックエンドに合わせる
          password: password,
        }),
      });

      const result = await response.json();
      if (result) {
        console.log("ログイン成功");
      } else {
        console.log("サインアップしてください");
      }
      console.log("レスポンス:", result);
    } catch (error) {
      console.error("エラー:", error);
    }
  };
  return (
    <>
      <h1>ログイン</h1>
      <form action="">
        <input type="text" placeholder="username" onChange={changeUsername} />
        <input
          type="password"
          placeholder="password"
          onChange={changePassword}
        />
        <button type="submit" onClick={handleSubmit}>
          ログイン
        </button>
      </form>
    </>
  );
};
