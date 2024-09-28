type LoginData = {
  username: string;
  password: string;
};
// ログインするときの関数を定義
export const fetchUserData = async (loginData: LoginData) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: loginData.username, // フィールド名をバックエンドに合わせる
        password: loginData.password,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("エラー:", error);
  }
};
