import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertUserData } from "../../../client/signup";

export const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const changeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    // ここの関数を登録する関数に変える
    const result = await insertUserData({ username, password });
    if (result.success) {
      navigate("/home");
    } else {
      setErrorMessage(result.message);
    }
  };
  return (
    <>
      <h1>サインアップ</h1>
      {errorMessage && <p>すでに存在するusernameです。</p>}
      <form action="">
        {}
        <input type="text" placeholder="username" onChange={changeUsername} />
        <input
          type="password"
          placeholder="password"
          onChange={changePassword}
        />
        <button type="submit" onClick={handleSubmit}>
          サインアップ
        </button>
      </form>
    </>
  );
};
