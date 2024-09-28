import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../../client/login";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const changeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("投稿しました");
    const result = await fetchUserData({ username, password });
    if (result) {
      navigate("/home");
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
