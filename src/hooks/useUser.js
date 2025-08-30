import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/ApiUser";

export default function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 1, // 1 minute instead of 5
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Changed to true for better auth state
    retry: 1, // Limit retries to improve performance
  });

  // Fix: Check if user data exists instead of checking for non-existent role
  return { isLoading, data, isAuthenticated: !!data };
}
