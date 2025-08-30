import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userSignup } from "../services/ApiUser";

export default function useSignup(reset) {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      userSignup({ email, password, fullName }),
    onSuccess: () => {
      toast.success("Created New User Successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
}
