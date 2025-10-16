import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eusvdwopkvcukkkgsbla.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1c3Zkd29wa3ZjdWtra2dzYmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTU3MDcsImV4cCI6MjA3NjAzMTcwN30.-7EHFvu-r_emi9M0S3VJtrsjQ6-iqjEybSzqir2SBRQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const loginAPI = {
  async login(username, password) {
    try {
      // 🔹 Cek data di tabel "akun"
      const { data, error } = await supabase
        .from("akun") // tabel kamu
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error || !data) {
        throw new Error("Username atau password salah!");
      }

      // ✅ Simpan data user ke localStorage
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      throw err;
    }
  },

  logout() {
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
