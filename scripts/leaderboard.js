addLeader = (name, clicks, time, mode, cards, target, score) => {
    const body = `name=${name}&clicks=${clicks}&time=${time}&mode=${mode}&cards=${cards}&target=${target}&score=${score}`
    fetch("https://robomatch-backend.herokuapp.com/submit", {
        body: body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
    })
}

fetchLeaders = () => {
    fetch('http://cors.io/?https://robomatch-backend.herokuapp.com/view')
        .then(function (response) {
            return response.json();
        })
        .then(function (leaderJson) {
            const table = document.getElementById("table")
            leaderJson.forEach(leader => {
                console.log(leader)
                const row = document.createElement("tr")
                row.setAttribute("class", "userRow")

                const data = ["name", "mode", "time", "clicks", "cards", "target", "score"]
                data.forEach(element => {
                    const td = document.createElement("td")
                    td.textContent = leader[element]
                    row.appendChild(td)
                });
                table.appendChild(row)
            });
        });
}

