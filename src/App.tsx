import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import AccountVerification from "./pages/auth/AccountVerification";
import { LoginPage } from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResendActivation from "./pages/auth/ResendActivation";
import { ResetPassword } from "./pages/auth/ResetPassword";

export default function App() {
  return (
    <Routes>
      {/* Protected Routes */}

      <Route path="/" element={<ProtectedRoutes />}>
        <Route index element={<Home />} />
      </Route>

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/resend-activation" element={<ResendActivation />} />
      <Route
        path="/auth/activate/:uid/:token"
        element={<AccountVerification />}
      />
    </Routes>
  );
}
