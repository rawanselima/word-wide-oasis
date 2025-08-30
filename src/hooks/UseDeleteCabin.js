import { deleteCabin } from "../services/ApiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function UseDeleteCabin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      toast.success("Successfully Deleted !");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
