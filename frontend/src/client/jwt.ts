export const checkJwt = async () => {
  const response = await fetch("https://localhost:3000/tokenVerification", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log("data", data);
  return data; // レスポンスのJSONデータを返す
};
