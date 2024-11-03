import { useState, useEffect } from "react";
import { checkJwt } from "../client/jwt";

export const useAuth = () => {
  const [check, setCheck] = useState<{
    checked: boolean;
    isAuthenticated: boolean;
  }>({ checked: false, isAuthenticated: false });
  useEffect(() => {
    const handleCheck = async () => {
      try {
        const response = await checkJwt();
        setCheck({
          checked: true,
          isAuthenticated: response.isAuthenticated,
        });
      } catch (error) {
        setCheck({ checked: true, isAuthenticated: false });
      }
    };
    handleCheck();
  }, []);
  return check;
};
