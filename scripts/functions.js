hideElement = (elem) => {
    console.log(elem)
    if (typeof elem === "object") {
        elem.forEach(elem => {
            hideElement(elem);
        });
    } else document.getElementById(elem).classList.add("hidden");
}

showElement = (elem) => {
    if (typeof elem === "object") {
        elem.forEach(elem => {
            showElement(elem);
        });
    } else document.getElementById(elem).classList.remove("hidden");
}

getUsername = () => {
    if (localStorage.getItem("username")) return localStorage.getItem("username");
    else {
        const defaultNames = [
            "Baymax",
            "Gort",
            "Edward Scissorhands",
            "Astro Boy",
            "Major Motoko Kusanagi",
            "The Tin Woodman",
            "The Iron Giant",
            "The Maschinenmensch",
            "Bender",
            "Lt. Commander Data",
            "The Terminator",
            "HAL 9000",
            "R2-D2",
            "C-3PO",
            "WALL-E",
        ]

        const robotName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
        const descriminator = Math.floor(1000 + Math.random() * 9000);

        return `${robotName}#${descriminator}`;
    }
}

cookieMonster = () => {
    if(!document.getElementById(`rememberMe`).checked) return;
    else {
        const confirm = window.confirm("Cookie Monster Alert! \nRemembering your username will store this data in your browser in a similar way a cookie would. Are you happy for this to happen? \n\n\nClicking cancel will remove any previously agreed \"Cookies\"")
        if(confirm) document.getElementById(`rememberMe`).checked = true
        else {
            document.getElementById(`rememberMe`).checked = false;
            localStorage.removeItem("username");
        }
    }
}

submitScore = () => {
    username = document.getElementById(`nameInput`).value;
    if(document.getElementById(`rememberMe`).checked) localStorage.setItem("username", username);
    addLeader(username, stats.clicks, stats.time, currentSelections.mode, currentSelections.images, stats.target, stats.score);
    hideElement(["won"]);
    showElement("panel");

    changeScreen("leaderboard");
}