import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const navHome = () => {
    navigate("/home");
  };

  const navCreatePage = () => {
    navigate("/create");
  };

  return (
    <div className="bg-mainYellow text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-lg font-bold">屍を越えてけ</h1>
      <div className="flex space-x-4">
        <p
          className="cursor-pointer underline"
          onClick={(e) => {
            navHome();
          }}
        >
          越えてきた屍のすべて
        </p>
        <p
          className="cursor-pointer underline"
          onClick={(e) => {
            navCreatePage();
          }}
        >
          屍を越える
        </p>
      </div>
    </div>
  );
};
