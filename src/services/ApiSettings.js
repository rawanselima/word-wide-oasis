import supabase from "./supabase";

export async function FetchSettingsData() {
  let { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Failed Read Data Settings !");
  }

  return data;
}

export async function EditingSettings({ newSettings, id }) {
  console.log(newSettings);
  const { data, error } = await supabase
    .from("settings")
    .update({ ...newSettings })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Failed To Edit Setting !");
  }

  if (!data || data.length === 0) {
    throw new Error("No data was updated.");
  }
}
