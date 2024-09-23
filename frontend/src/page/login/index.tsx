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

  //   どこでsetするか問題
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("投稿しました");

    // TODO: Tanstackqueryを使用する
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
