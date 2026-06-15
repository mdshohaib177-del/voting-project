from supabase import create_client

# Supabase credentials
url = "https://wepdsnpbkesxpztbikhf.supabase.co"

key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcGRzbnBia2VzeHB6dGJpa2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MjM1ODgsImV4cCI6MjA5MzI5OTU4OH0.LGvneNqy26vSsZG_NjEUOgnS4oUbJInirMsVAwpWgYI"

# Create Supabase client
supabase = create_client(url, key)


# Fetch all users
def fetch_users():

    res = supabase.table("user").select("*").execute()

    return res.data


# Insert new user
def insert_user(name, face_encoding):

    data = {
        "name": name,
        "face_encoding": face_encoding,
        "has_voted": False
    }

    res = supabase.table("user").insert(data).execute()

    return res.data


# Update voting status
def update_vote_status(user_id):

    res = supabase.table("user").update(
        {"has_voted": True}
    ).eq("id", user_id).execute()

    return res.data


# Fetch all votes
def fetch_votes():

    res = supabase.table("votes").select("*").execute()

    return res.data