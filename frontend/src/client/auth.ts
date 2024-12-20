// 認証情報をフェッチする関数を定義
export const fetchAuthData = async (loginData: string) => {
  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: "hoge",
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("エラー:", error);
  }
};
