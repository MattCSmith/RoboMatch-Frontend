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

let sort = ["score", "desc"];
let filter = ["all", "all"]

fetchLeaders = () => {
    removeChildren("tbody")

    fetch(`https://robomatch-backend.herokuapp.com/view?field=${sort[0]}&order=${sort[1]}&filter=${filter[0]}&option=${filter[1]}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (leaderJson) {
            const table = document.getElementById("tbody")
            leaderJson.forEach(leader => {
                const row = document.createElement("tr")
                row.setAttribute("class", "userRow")

                const data = ["name", "mode", "time", "clicks", "target", "cards", "score"]
                data.forEach(element => {
                    const td = document.createElement("td")
                    td.textContent = leader[element]
                    row.appendChild(td)
                });
                table.appendChild(row)
                populateOptions(leader)
            });
        });
};

sortData = (field, order) => {
    if (field) sort[0] = field;
    if (order) sort[1] = order;
    // removeChildren("tbody")
    fetchLeaders()
}

const selOptions = { name: [], mode: [], cards: [] }
populateOptions = (data) => {
    if (!selOptions.name.includes(data.name)) selOptions.name.push(data.name);
    if (!selOptions.mode.includes(data.mode)) selOptions.mode.push(data.mode);
    if (!selOptions.cards.includes(data.cards)) selOptions.cards.push(data.cards);
}

filterData = (field, selection) => {

    if (field) {
        const select = document.getElementById("selectOptions");
        select.options.length = 0;
        select.options[select.options.length] = new Option("Select option", "");
        selOptions[field].forEach(opt => {
            select.options[select.options.length] = new Option(opt, opt);
        });
        filter[0] = field
    }

    if (selection) {
        filter[1] = selection
        disableSortOption()
        fetchLeaders()
    }
}

removeFilter = () => {
    filter = ["all", "all"]
    fetchLeaders()
    document.getElementById("selectOptions").options.length = 0;
    document.getElementById("filterSel").selectedIndex = "0";
}

disableSortOption = () => {
    const options = ["name", "mode", "cards"]

    options.forEach(opt => {
        if (opt === filter[0]) document.getElementById(`sort${opt}`).disabled = true
        else document.getElementById(`sort${opt}`).disabled = false
    });
}