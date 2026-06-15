if (
    localStorage.getItem("adminLoggedIn")
    !== "true"
) {
    alert("Admin Access Required");
    window.location.href = "index.html";
}

async function loadResults() {

    const { data, error } =
        await db
        .from("votes")
        .select("*");

    if (error) {

        console.error(error);
        return;
    }

    let a = 0;
    let b = 0;
    let c = 0;

    data.forEach(vote => {

        if (vote.candidate === "Candidate A")
            a++;

        if (vote.candidate === "Candidate B")
            b++;

        if (vote.candidate === "Candidate C")
            c++;
    });

    // Vote Count Display
    document.getElementById("candidateA").innerText =
        a + " Votes";

    document.getElementById("candidateB").innerText =
        b + " Votes";

    document.getElementById("candidateC").innerText =
        c + " Votes";

    // Total Votes
    const totalVotes = a + b + c;

    document.getElementById("totalVotes").innerText =
        "Total Votes : " + totalVotes;

    // Winner
    let winner = "Tie";

    if (a > b && a > c)
        winner = "Candidate A 🏆";

    else if (b > a && b > c)
        winner = "Candidate B 🏆";

    else if (c > a && c > b)
        winner = "Candidate C 🏆";

    document.getElementById("winner").innerText =
        winner;

    // Progress Bars
    if (totalVotes > 0) {

        document.getElementById("barA").style.width =
            (a / totalVotes * 100) + "%";

        document.getElementById("barB").style.width =
            (b / totalVotes * 100) + "%";

        document.getElementById("barC").style.width =
            (c / totalVotes * 100) + "%";
    }
}