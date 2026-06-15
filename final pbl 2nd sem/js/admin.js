function adminLogin() {

    const user =
        document.getElementById("adminUser").value;

    const pass =
        document.getElementById("adminPass").value;

    if (
        user === "admin" &&
        pass === "admin123"
    ) {

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        window.location.href =
            "results.html";

    } else {

        alert(
            "Invalid Admin Credentials"
        );

    }
}