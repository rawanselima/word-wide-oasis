import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/ApiBooking";
import toast from "react-hot-toast";

export default function useEditBooking() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ updatedBooking, id }) =>
      updateBooking({ updatedBooking, id }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success(`Updated Booking ${variables.id} Successfully`);
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
