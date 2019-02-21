let stats = {};
let deck = [];
let cardsFound = [];
let username = getUsername();

resetGame = () => {
    stats = {
        time: 0,
        clicks: 0,
        matched: 0,
        target: 0,
        score: 0
    };
    deck = [];
    cardsFound = [];
    currentFlipped = [];

    removeChildren("cc")

    showElement("cc")
}

startGame = () => {
    resetGame()
    initStats();
    showElement(["statsBox", "homeBtn"]);
    hideElement("panel");
    buildDeck();
};

initStats = () => {
    stats.target = Math.ceil((0.8 * currentSelections.images) * 4);

    Object.keys(stats).forEach(s => {
        if (s === "target") {
            updateStats("target", "setValue", stats.target);
        } else {
            updateStats(s, "setValue", 0);
        }
    });
};

updateStats = (stat, method, value) => {
    let suffix = {
        time: "Secs",
        clicks: "Clicks",
        target: "Target",
        matched: "Paired",
        score: ""
    };

    if (method === "addPoint") {
        stats[stat]++;
        if (stat === "clicks") {
            if (stats.target - stats.clicks < 5) document.getElementById("iTarget").setAttribute("class", "fas fa-crosshairs orange");
            if (stats.target - stats.clicks <= 0) document.getElementById("iTarget").setAttribute("class", "fas fa-crosshairs red")
        };
    };
    if (method === "setValue") {
        stats[stat] = value;
    };

    document.getElementById(stat).textContent = `${stats[stat]} ${suffix[stat]}`;
};

buildDeck = () => {
    deck = [];
    const max = levels[currentSelections["mode"]].maxImages;
    let i = currentSelections.images;
    while (i > 0) {
        const numb = Math.floor((Math.random() * max));
        if (!deck.includes(numb)) {
            deck.push(numb);
            deck.push(numb);
            i--
        }
    };

    // Shuffle Deck
    deck.sort(function () {
        return 0.5 - Math.random()
    });

    dealDeck();
};

dealDeck = () => {
    let imgColours = ["blue", "green", "red", "pink", "yellow", "orange", "gray", "lime", "purple"]
    let colour = imgColours[Math.floor(Math.random() * 9)]
    deck.forEach((c, i) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.onclick = function () {
            flipCard(`${c}-${i}`)
        };

        const img = document.createElement("img");
        if (currentSelections.mode === "hard" || currentSelections.mode === "insane") img.src = `${levels[currentSelections.mode].imgLocation}${colour}/${c}.png`;
        else img.src = `${levels[currentSelections.mode].imgLocation}${c}.png`;
        img.setAttribute("id", `${c}-${i}`);
        img.setAttribute("class", "hidden");
        if (currentSelections.mode === "insane") img.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;

        card.appendChild(img);
        document.getElementById("cc").appendChild(card);
    });

    timeGame()
};

timeGame = () => {
    time = window.setInterval(() => {
        updateStats("time", "addPoint")
    }, 1000);
}

flipCard = (c) => {
    if (cardsFound.includes(c)) return;
    if(currentFlipped.includes(c)) return;
    if (currentFlipped.length > 1) return;
    else {
        showElement(c);
        checkMatch(c);
        updateStats("clicks", "addPoint");
        calculateScore();
    };
};

let currentFlipped = []
checkMatch = (i) => {
    currentFlipped.push(i)
    if (currentFlipped.length === 2) {
        calculateScore()
        const cardOne = currentFlipped[0].slice(0, currentFlipped[0].indexOf("-"))
        const cardTwo = currentFlipped[1].slice(0, currentFlipped[1].indexOf("-"))
        if (cardOne === cardTwo) doesMatch(currentFlipped[0], currentFlipped[1])
        else noMatch()
    }
}

doesMatch = (card1, card2) => {
    currentFlipped = [];
    cardsFound.push(card1, card2)
    updateStats("matched", "addPoint")
    checkWin()
}

noMatch = () => {
    setTimeout(function () {
        hideElement([currentFlipped[0], currentFlipped[1]])
        currentFlipped = [];
    }, levels[currentSelections["mode"]].speed);
}

checkWin = () => {
    if (stats.matched >= currentSelections.images) {
        clearInterval(time)
        hideElement(["statsBox", "cc"])
        createWon()
    }
}

calculateScore = () => {
    const bonus = {
        easy: 0.0009,
        medium: 0.0007,
        hard: 0.0003,
        insane: 0.0001
    };

    const s1 = currentSelections.images / bonus[currentSelections.mode]
    const s2 = s1 - stats.clicks;
    const s3 = s2 / stats.time;
    const s4 = s3 * (stats.target - stats.clicks < 1 ? 1 : stats.target - stats.clicks);

    stats.score = Math.round(s4);
    document.getElementById("score").textContent = `${stats["score"]}`;
}