import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./app/page/login";
import { SignupPage } from "./app/page/signup";
import { HomePage } from "./app/page/home";
import { CreateReflectionPage } from "./app/page/create";
import { ViewReflectionPage } from "./app/page/view";
import "./App.css";
import { Header } from "./components/header";
import { Outlet } from "react-router-dom";
import { PrivateRoute } from "./AuthRouter";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // 共通レイアウトを使用
      children: [
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
          element: (
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          ),
        },
        {
          path: "/create",
          element: (
            <PrivateRoute>
              <CreateReflectionPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/view/:reflection_id",
          element: (
            <PrivateRoute>
              <ViewReflectionPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
