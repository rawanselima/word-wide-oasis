import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zbnmhswrjffetbknbrbk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpibm1oc3dyamZmZXRia25icmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTk5MDIsImV4cCI6MjA2NzY3NTkwMn0.gKwE4r1pu30MdwuCInIXBZGxFhal0PT9ENtgXZMEwno";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
