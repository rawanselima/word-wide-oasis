import supabase, { supabaseUrl } from "./supabase";

export async function fetchCabins() {
  const { data, error } = await supabase.from("cabin").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Failed To Load Cabins !");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabin").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Failed To Delete Cabin !");
  }
}

export async function InsertCabin(newCabin) {
  const imageFile = newCabin.image;
  const imageName = `${Date.now()}-${imageFile.name}`;
  const imagePath = `cabin-images/${imageName}`;

  // 1. Upload image to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile);

  if (uploadError) {
    console.error(uploadError.message);
    throw new Error("Failed to upload image !");
  }

  // 2. Build public URL
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/${imagePath}`;

  // 3. Insert into DB
  console.log(newCabin);
  const { error: insertError } = await supabase
    .from("cabin")
    .insert([{ ...newCabin, image: imageUrl }])
    .select();

  if (insertError) {
    console.error(insertError.message);
    throw new Error("Failed To Insert Cabin !");
  }
}

export async function EditCabin({ newCabin, id }) {

  if (!id) {
    throw new Error("Cabin ID is required for update");
  }

  const NewImage = newCabin.image?.startsWith?.(supabaseUrl) ? true : false;

  if (!NewImage) {
    const imageFile = newCabin.image;
    const imageName = `${Date.now()}-${imageFile.name}`;
    const imagePath = `cabin-images/${imageName}`;

    // 1. Upload image to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, imageFile);

    if (uploadError) {
      console.error(uploadError.message);
      throw new Error("Failed to upload image !");
    }
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${imagePath}`;
    newCabin.image = imageUrl;
  }

  // 2. Build public URL
  const { error } = await supabase
    .from("cabin")
    .update({ ...newCabin })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Failed To Update This Cabin !");
  }
}
