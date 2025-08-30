import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/ApiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => getUser({ email, password }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      toast.success("Login Successfully");

      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Login error:", error);
      toast.error("Ensure that email and password correctly");

      // Clear any invalid user data on error
      queryClient.setQueryData(["currentUser"], null);
    },

    onSettled: () => {
      // Always invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return { mutate, isPending };
}
