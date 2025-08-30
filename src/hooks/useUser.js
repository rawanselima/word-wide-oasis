import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/ApiUser";

export default function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { isLoading, data, isAuthenticated: data?.role === "authenticated" };
}
