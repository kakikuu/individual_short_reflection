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
    <div>
      <h1>屍を越えてけ</h1>
      <div>
        <p
          onClick={(e) => {
            navHome();
          }}
        >
          越えてきた屍のすべて
        </p>
        <p
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
