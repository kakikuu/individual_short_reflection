import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

type AuthRouterProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: AuthRouterProps) => {
  const check = useAuth();

  if (!check.checked) {
    return <div>Loading...</div>;
  }
  if (!check.isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/home" />;
};

export const GuestRoute = ({ children }: AuthRouterProps) => {
  const check = useAuth();
  console.log(check);
  if (!check.checked) {
    return <div>Loading...</div>;
  }
  if (!check.isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
};
