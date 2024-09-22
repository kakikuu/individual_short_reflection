import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import logo from "./logo.svg";
import { LoginPage } from "./page/login";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      // children: [
      //   {
      //     index: true,
      //     element: <Top />,
      //   },
      // ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
