import { supabase } from "./supabaseClient";

export async function uploadAvatar(file) {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `avatar/${fileName}`; // path di dalam bucket 'avatar'

  const { error: uploadError } = await supabase.storage.from('avatar').upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data, error: urlError } = supabase.storage.from('avatar').getPublicUrl(filePath);

  if (urlError) {
    throw urlError;
  }

  return data.publicUrl;
}
