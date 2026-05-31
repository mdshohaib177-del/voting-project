from supabase import create_client
import numpy as np
import face_recognition

from face_utils import capture_and_encode

# Supabase credentials
url = "https://wepdsnpbkesxpztbikhf.supabase.co"

key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcGRzbnBia2VzeHB6dGJpa2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MjM1ODgsImV4cCI6MjA5MzI5OTU4OH0.LGvneNqy26vSsZG_NjEUOgnS4oUbJInirMsVAwpWgYI"

supabase = create_client(url, key)

# Capture current face
live_encoding = capture_and_encode()

if live_encoding is None:
    print("Face capture failed ❌")
    exit()

res = supabase.table("user").select("*").execute()

users = res.data

print(users)

for user in users:

    try:

        # Convert stored encoding string to numpy array
        encoding_text = user["face_encoding"].strip("[]")

        # Detect separator automatically
        if "," in encoding_text:

            stored_encoding = np.fromstring(
                encoding_text,
                sep=','
            )

        else:

            stored_encoding = np.fromstring(
                encoding_text,
                sep=' '
            )

        # Compare live face with stored face
        match = face_recognition.compare_faces(
            [stored_encoding],
            live_encoding
        )

        if match[0]:

            print(f"Match found ✅ : {user['name']}")

            # Check voting status
            if user["has_voted"]:
                print("Already voted ❌")

            else:
                print("Allowed to vote ✅")

                # Update vote status in database
                supabase.table("user").update(
                    {"has_voted": True}
                ).eq("id", user["id"]).execute()

                print("Vote status updated ✅")

        else:
            print(f"No match with {user['name']}")

    except Exception as e:
        print(f"Error comparing {user['name']}: {e}")