import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EditCabin } from "../services/ApiCabins";

export function UseEditCabin({ onClose, reset }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: EditCabin,
    onSuccess: () => {
      toast.success("Successfully Edited !");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      if (reset) reset();
      if (onClose) onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
