import useOAuthLogin from "@/features/auth/hooks/useOAuthLogin";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function GithubOAuth() {
  const { oAuthLogin } = useOAuthLogin();
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  useEffect(() => {
    oAuthLogin({ provider: "github", state: state!, code: code! }, {});
  }, [state, code, oAuthLogin]);
  return (
    <main className="min-h-screen grid place-items-center">
      <Loader2 className="size-6 animate-spin" />
    </main>
  );
}
