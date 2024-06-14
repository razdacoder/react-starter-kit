import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
