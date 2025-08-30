import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/ApiUser";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateUser({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success("Update Data Successfully");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
}
