import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReflection } from "../../../client/reflection";
import { useAuth } from "../../../context/AuthContext";

export const CreateReflectionPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [whatMiss, setWhatMiss] = useState("");
  const [whyMiss, setWhyMiss] = useState("");
  const [preventMiss, setPreventMiss] = useState("");
  const { userId } = useAuth();

  const navHome = () => {
    navigate("/home");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const contents = {
      id: undefined,
      title: title,
      userId: userId,
      whatMiss: whatMiss,
      whyMiss: whyMiss,
      preventMiss: preventMiss,
      createdAt: undefined,
    };
    const result = await createReflection(contents);
    console.log(result);
    if (result.success) {
      console.log("成功");
      navigate("/home");
    } else {
      console.log("失敗");
    }
  };

  return (
    <>
      <button onClick={navHome}>ホームに戻る</button>
      <div>反省作成フォーム</div>
      <form>
        <div>
          <p>タイトル</p>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <p>何をミスしたか</p>
          <input type="text" onChange={(e) => setWhatMiss(e.target.value)} />
        </div>
        <div>
          <p>なぜミスしたか</p>
          <input type="text" onChange={(e) => setWhyMiss(e.target.value)} />
        </div>
        <div>
          <p>どうすればミスを防げるか</p>
          <input type="text" onChange={(e) => setPreventMiss(e.target.value)} />
        </div>
        <button type="submit" onClick={handleSubmit}>
          作成
        </button>
      </form>
    </>
  );
};
