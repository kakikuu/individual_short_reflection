import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

type AuthRouterProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: AuthRouterProps) => {
  const { checked, isAuthenticated } = useAuth();
  console.log("PrivateRoute", checked, isAuthenticated);

  if (!checked) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // 認証されていない場合はログインページへリダイレクト
  }

  return <>{children}</>;
};
