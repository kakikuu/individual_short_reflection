import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

type AuthRouterProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: AuthRouterProps) => {
  const check = useAuth();
  console.log("PrivateRoute", check);

  if (!check.checked) {
    return <div>Loading...</div>;
  }
  if (!check.isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/home" />;
};
