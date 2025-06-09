import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jdhexomeymknoalhuopy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaGV4b21leW1rbm9hbGh1b3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNTA2NTAsImV4cCI6MjA2NDkyNjY1MH0.fcofUFsmwEMXUFKZy_2oEGw4hiXp4O8hjzZPcQB6v1k";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
