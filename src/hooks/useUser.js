import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/ApiUser";

export default function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  return { isLoading, data, isAuthenticated: !!data };
}
