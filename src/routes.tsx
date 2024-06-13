import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { LoginPage } from "./pages/Login";
import Register from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
