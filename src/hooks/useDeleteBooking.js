import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../services/ApiBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      navigate("/booking");
      toast.success("Deleted Booking Successfully ");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutation };
}
