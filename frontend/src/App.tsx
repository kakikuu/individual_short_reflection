import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./app/page/login";
import { SignupPage } from "./app/page/signup";
import { HomePage } from "./app/page/home";
import "./App.css";

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
  return <RouterProvider router={router} />;
}

export default App;
