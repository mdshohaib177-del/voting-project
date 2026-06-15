const SUPABASE_URL = "https://wepdsnpbkesxpztbikhf.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcGRzbnBia2VzeHB6dGJpa2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MjM1ODgsImV4cCI6MjA5MzI5OTU4OH0.LGvneNqy26vSsZG_NjEUOgnS4oUbJInirMsVAwpWgYI";

window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);