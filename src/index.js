import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import App from "./App";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import { PopUpProvider } from "./contexts/PopUpContext";
import Order from "./pages/Order/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout/:step",
        element: <Checkout />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PopUpProvider>
        <RouterProvider router={router} />
      </PopUpProvider>
    </UserProvider>
  </React.StrictMode>
);
