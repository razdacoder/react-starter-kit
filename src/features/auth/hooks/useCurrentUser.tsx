import { getCurrentUser } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["loggedIn-user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading };
}
