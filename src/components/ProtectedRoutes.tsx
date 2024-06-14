import useVerifyToken from "@/features/auth/hooks/useVerifyToken";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { verifyToken, verifying } = useVerifyToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    verifyToken(undefined, {
      onSuccess: () => {
        setIsAuthenticated(true);
        setIsInitialized(true);
      },
      onError: () => {
        setIsAuthenticated(false);
        setIsInitialized(true);
      },
    });
  }, [verifyToken]);

  if (verifying || !isInitialized) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-200">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
