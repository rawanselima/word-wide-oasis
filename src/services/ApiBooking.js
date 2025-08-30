import supabase from "./supabase";

export async function FetchBooking() {
  let { data: booking, error } = await supabase.from("booking").select(`
      *,
      cabinID(name),
      guestID(fullName , email)
    `);

  if (error) {
    console.error(error);
    throw new Error("Failed Loading Booking Data!");
  }
  return booking;
}

export async function FetchBookingDetails(id) {
  let { data: booking, error } = await supabase
    .from("booking")
    .select(
      `
      *,
      cabinID(name),
      guestID(fullName , email , nationalID )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed Loading Booking Data!");
  }

  return booking;
}

export async function updateBooking({ updatedBooking, id }) {
  const cleanedBooking = {
    ...updatedBooking,
    guestID:
      typeof updatedBooking.guestID === "object"
        ? updatedBooking.guestID.id
        : updatedBooking.guestID,
    cabinID:
      typeof updatedBooking.cabinID === "object"
        ? updatedBooking.cabinID.id
        : updatedBooking.cabinID,
  };

  const { data, error } = await supabase
    .from("booking")
    .update({ ...cleanedBooking })
    .eq("id", id)
    .select(
      `
      *,
      cabinID(name),
      guestID(fullName, email)
    `
    );

  if (error) {
    console.error("Update error:", {
      message: error.message,
      code: error.code,
      details: error.details,
    });
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function deleteBooking(id) {
  const { error, data } = await supabase
    .from("booking")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed Loading Booking Data!");
  }

  return data;
}

export async function createdAtBooking(startDate) {
  const endDate = new Date().toISOString();

  let { data, error } = await supabase
    .from("booking")
    .select(
      `
      *,
      cabinID(name),
      guestID(fullName, email)
    `
    )
    .lte("startDate", endDate)
    .gte("startDate", startDate);

  if (error) {
    console.error(error.message);
    throw new Error("Failed Fetch Booking Data");
  }

  return data;
}
