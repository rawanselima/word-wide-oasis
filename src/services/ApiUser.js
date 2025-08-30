import supabase, { supabaseUrl } from "./supabase";

export async function getUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Failed Fetch User Data");
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function userLogout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Failed Logout ");
    throw new Error(error.message);
  }
}

export async function userSignup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName || "",
        avatar: "",
        phone: "",
      },
    },
  });

  if (error) {
    console.error("Failed User SighUp ");
    throw new Error(error.message);
  }

  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData = {};

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);


  // Only proceed to upload if avatar is a File/Blob (browser env)
  const isBlob = typeof Blob !== "undefined" && avatar instanceof Blob;
  if (!isBlob) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user metadata
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
