import { createBrowserRouter, redirect } from "react-router-dom";
import Homepage from "../pages/Homepage";
import MyBooking from "../pages/MyBooking";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/booking",
    element: <MyBooking />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/home",
    element: <Homepage />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
