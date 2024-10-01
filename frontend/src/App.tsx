import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./app/page/login";
import { SignupPage } from "./app/page/signup";
import { HomePage } from "./app/page/home";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
