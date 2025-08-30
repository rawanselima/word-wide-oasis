import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/ApiUser";

export default function useLogout() {
  const navigate = useNavigate();
  const clientQuery = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      clientQuery.removeQueries({ queryKey: ["currentUser"] });
      navigate("/login", { replace: true });
    },
  });

  return { mutate, isPending };
}
