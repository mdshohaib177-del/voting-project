from supabase import create_client
import numpy as np
from face_utils import capture_and_encode

# Supabase credentials
url = "https://wepdsnpbkesxpztbikhf.supabase.co"

key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcGRzbnBia2VzeHB6dGJpa2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MjM1ODgsImV4cCI6MjA5MzI5OTU4OH0.LGvneNqy26vSsZG_NjEUOgnS4oUbJInirMsVAwpWgYI"

# Create client
supabase = create_client(url, key)

print("Supabase connected ✅")

# Ask user name
name = input("Enter user name: ")

# Capture face
encoding = capture_and_encode()

if encoding is not None:

    try:
        # Convert encoding to string
        encoding_str = ",".join(map(str, encoding.tolist()))

        # Data
        data = {
            "name": name,
            "face_encoding": encoding_str,
            "has_voted": False
        }

        print("Sending data to Supabase...")

        # Insert into database
        res = supabase.table("user").insert(data).execute()

        print("Face stored in database ✅")
        print(res)

    except Exception as e:
        print("ERROR:")
        print(e)

else:
    print("Encoding failed ❌")