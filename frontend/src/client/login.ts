type LoginData = {
  username: string;
  password: number;
};
// ログインするときの関数を定義
export const fetchUserData = async (loginData: LoginData) => {
  try {
    const response = await fetch("https://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        user_name: loginData.username,
        password: loginData.password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      return {
        success: false,
        message: errorData,
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    // fetchのcatchはネットワークエラーの場合にしか呼ばれない
    return {
      success: false,
      message: error.message || "ネットワークエラーです",
    };
  }
};
