import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../../client/login";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(0);
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

    const result = await fetchUserData({ username, password });
    if (result.success) {
      navigate("/home");
    } else {
      setErrorMessage(result.message);
    }
  };
  return (
    <>
      <h1>ログイン</h1>
      {errorMessage && <p>パスワードが違うかユーザ名が違います</p>}
      <form action="">
        {}
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
