async function vote(candidate) {

    const userId =
        localStorage.getItem("userId");

    if (!userId) {
        alert("Please Login First");
        return;
    }

    const { data, error } = await db
        .from("user")
        .select("has_voted")
        .eq("id", userId);

    if (error) {
        alert(error.message);
        return;
    }

    if (data[0].has_voted === true) {
        alert("You Have Already Voted");
        return;
    }

    const { error: voteError } = await db
        .from("votes")
        .insert([
            {
                user_id: userId,
                candidate: candidate
            }
        ]);

    if (voteError) {
        alert(voteError.message);
        return;
    }

    await db
        .from("user")
        .update({
            has_voted: true
        })
        .eq("id", userId);

    alert("Vote Submitted Successfully");

    window.location.href =
        "results.html";
}

function logout() {

    localStorage.removeItem("userId");

    alert("Logged Out");

    window.location.href =
        "login.html";
}