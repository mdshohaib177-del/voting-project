console.log("Biometric Voting System Started");

// Function to check if USN already exists
async function checkUSNExists(usn) {
    try {
        const { data, error } = await db
            .from("user")
            .select("*")
            .eq("usn", usn);

        if (error) {
            console.error("Error checking USN:", error);
            return false;
        }

        return data && data.length > 0;
    } catch (e) {
        console.error("Exception checking USN:", e);
        return false;
    }
}

// Function to check if a similar face already exists
async function checkFaceExists(currentDescriptor) {
    try {
        const { data, error } = await db
            .from("user")
            .select("*");

        if (error) {
            console.error("Error fetching users:", error);
            return null;
        }

        if (!data || data.length === 0) {
            return null;
        }

        const threshold = 0.5; // Same threshold used in login

        for (const user of data) {
            if (!user.face_encoding) continue;

            try {
                // Convert stored encoding string to array
                const storedDescriptor = user.face_encoding.split(",").map(Number);

                // Calculate euclidean distance
                const distance = faceapi.euclideanDistance(currentDescriptor, storedDescriptor);

                // If distance is below threshold, faces match
                if (distance <= threshold) {
                    return user; // Return the matched user
                }
            } catch (e) {
                console.error(`Error comparing with user ${user.id}:`, e);
                continue;
            }
        }

        return null; // No matching face found
    } catch (e) {
        console.error("Exception checking face:", e);
        return null;
    }
}

async function registerUser() {
    const name = document.getElementById("name").value.trim();
    const usn = document.getElementById("usn").value.trim();

    if (!name || !usn) {
        alert("Please fill all fields");
        return;
    }

    if (!window.faceCaptureDescriptor) {
        alert("Please capture your face before registering.");
        return;
    }

    // Check 1: Check if USN already exists (PREVENT DUPLICATE USN)
    const usnExists = await checkUSNExists(usn);
    if (usnExists) {
        alert("❌ USN already registered! Please use a different USN or login if you already have an account.");
        return;
    }

    // Check 2: Check if face already exists (PREVENT DUPLICATE FACE REGISTRATION)
    const matchedUser = await checkFaceExists(window.faceCaptureDescriptor);
    if (matchedUser) {
        alert("❌ This face is already registered.\n\nYou cannot register the same face twice. Please use a different face or login with your existing account.");
        return;
    }

    const encodingString = faceCaptureDescriptor.join(",");

    const { error } = await db
        .from("user")
        .insert([
            {
                name: name,
                usn: usn,
                face_encoding: encodingString,
                has_voted: false
            }
        ]);

    if (error) {
        console.error(error);
        alert(error.message);
    } else {
        alert("✅ Registration Successful!");
        window.location.href = "login.html";
    }
}

async function loginUser() {
    const usn = document.getElementById("loginUsn").value.trim();

    if (!usn) {
        alert("Enter USN");
        return;
    }

    if (!window.faceVerifiedUserId || window.faceVerifiedUserUsn !== usn) {
        alert("Please verify your face before logging in.");
        return;
    }

    localStorage.setItem("userId", window.faceVerifiedUserId);
    alert("Login Successful");
    window.location.href = "voting.html";
}