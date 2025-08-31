import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/ApiBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ updatedBooking, id }) =>
      updateBooking({ updatedBooking, id }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success(`Updated Booking ${variables.id} Successfully`);
      navigate(-1);
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
