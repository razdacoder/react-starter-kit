import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AccountVerification from "./pages/auth/AccountVerification";
import { LoginPage } from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResendActivation from "./pages/auth/ResendActivation";
import { ResetPassword } from "./pages/auth/ResetPassword";

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
  {
    path: "auth/activate/:uid/:token",
    element: <AccountVerification />,
  },
  {
    path: "/resend-activation",
    element: <ResendActivation />,
  },
]);

export default router;
