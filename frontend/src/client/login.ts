type LoginData = {
  username: string;
  password: number;
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
    // バックエンド側でなんのエラーが起こったかを判別する場所は1つだけにする
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
