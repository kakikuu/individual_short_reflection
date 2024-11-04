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
      navigate("/create");
    } else {
      setErrorMessage(result.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>

        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">
            パスワードが違うかユーザ名が違います
          </p>
        )}

        <form action="" className="space-y-4">
          <input
            type="text"
            placeholder="username"
            onChange={changeUsername}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainYellow"
          />
          <input
            type="password"
            placeholder="password"
            onChange={changePassword}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainYellow"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-mainYellow text-white py-2 rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};
