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
      queryClient.setQueryData(["user"]);
      toast.success("Login Successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Ensure that email and password correctly");
    },
  });

  return { mutate, isPending };
}
