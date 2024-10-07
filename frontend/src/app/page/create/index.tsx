import { useState } from "react";
import { createReflection } from "../../../client/reflection";
import { useAuth } from "../../../context/AuthContext";

export const CreateReflectionPage = () => {
  const [title, setTitle] = useState("");
  const [whatMiss, setWhatMiss] = useState("");
  const [whyMiss, setWhyMiss] = useState("");
  const [preventMiss, setPreventMiss] = useState("");
  const { userId } = useAuth();

  const handleSubmit = async () => {
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
    if (result.success) {
      console.log("成功");
    } else {
      console.log("失敗");
    }
  };

  return (
    <>
      <div>反省作成フォーム</div>
      <form action="">
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
