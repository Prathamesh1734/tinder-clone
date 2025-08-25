"use server";

import { createClient } from "../supabase/server";

export async function getCurrentUserProfile() {
  const supabase = await createClient();

  //will return user who's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log("Error fetching user profile: ", error);
    return null;
  }

  return profile;
}
