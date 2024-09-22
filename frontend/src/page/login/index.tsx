export const LoginPage = () => {
  const handleSubmit = () => {
    console.log("投稿しました");
  };
  return (
    <>
      <h1>ログイン</h1>
      <form action="">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button type="submit" onClick={handleSubmit}>
          {" "}
          ログイン{" "}
        </button>
      </form>
    </>
  );
};
