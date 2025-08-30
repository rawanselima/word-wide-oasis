import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertCabin } from "../services/ApiCabins";
import toast from "react-hot-toast";

export function UseCreateCabin(reset, setShowForm) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: InsertCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      toast.success("Successfully Added !");
      if (reset) reset();
      setShowForm;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
