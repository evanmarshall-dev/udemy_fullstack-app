import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjqattpnvbkwmblbunop.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcWF0dHBudmJrd21ibGJ1bm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NzMzMzIsImV4cCI6MjA2MDI0OTMzMn0.b559b80udtLGKfhX-9V1D1F4N5ZSqvAAUs8F4ZjF9G0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
