console.log("Biometric Voting System Started");

async function registerUser() {

    const name = document.getElementById("name").value;
    const usn = document.getElementById("usn").value;

    if (!name || !usn) {
        alert("Please fill all fields");
        return;
    }

    const { error } = await db
        .from("user")
        .insert([
            {
                name: name,
                usn: usn,
                face_encoding: "pending",
                has_voted: false
            }
        ]);

    if (error) {
        console.error(error);
        alert(error.message);
    } else {
        alert("Registration Successful");
        window.location.href = "login.html";
    }
}
async function loginUser() {

    const usn =
        document.getElementById("loginUsn").value;

    if (!usn) {
        alert("Enter USN");
        return;
    }

    const { data, error } = await db
        .from("user")
        .select("*")
        .eq("usn", usn);

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    if (data.length === 0) {
        alert("User Not Found");
        return;
    }

    localStorage.setItem(
        "userId",
        data[0].id
    );

    alert("Login Successful");

    window.location.href =
        "voting.html";
}