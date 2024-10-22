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
      <div className="mt-8 mx-auto max-w-lg">
        <h1 className="text-2xl font-bold mb-8">屍を越えてけ</h1>

        <form className="space-y-8">
          <div>
            <p className="font-bold">止めたい思考</p>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <p className="font-bold">何に失敗したのか</p>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              onChange={(e) => setWhatMiss(e.target.value)}
            />
          </div>

          <div>
            <p className="font-bold">なぜ失敗したのか</p>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              onChange={(e) => setWhyMiss(e.target.value)}
            />
          </div>

          <div>
            <p className="font-bold">どうやって失敗を防ぐか</p>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              onChange={(e) => setPreventMiss(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-mainYellow text-white py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            屍にする
          </button>
        </form>
      </div>
    </>
  );
};
