const currentSelections = {
    screen: "play",
    mode: "select",
    images: 20
};
const levels = {
    select: {
        name: "Select level...",
        title: "Aim of the game",
        desc: "RoboMatch, which can also be known as MatchUp, Pelmanism, Memory, Pexeso, Concentration, Shinkei-suijaku or simply Pairs, is a simple card game. In which all of the cards are laid face down and each turn sees two card turned over. Only matching pairs will remain face up! The object of the game is to turn over all the matching pairs."
    },
    easy: {
        name: "Easy",
        title: "Easy Mode",
        desc: "A simple gamemode, with fairly unique robots and a slow flip back time of 0.8 seconds. A great way to warm up that prefrontal cortex",
        maxImages: 30,
        imgLocation: './images/levels/easy/',
        speed: 800
    },
    medium: {
        name: "Medium",
        title: "Medium Mode",
        desc: "This gamemode has upto a 100 images, where some may share some similarites. The flip back time in this mode is set at 0.6 seconds",
        maxImages: 100,
        imgLocation: './images/levels/medium/',
        speed: 600
    },
    hard: {
        name: "Hard",
        title: "Hard Mode",
        desc: "A fairly challenging gamemode, featuring 9 colour sets each containing 50 robots. Each game will consist of only one colour set and a flip back time of 0.4 seconds",
        maxImages: 50,
        imgLocation: './images/levels/hard/',
        speed: 400
    },
    insane: {
        name: "Insane",
        title: "Insane Mode",
        desc: "Not for the faint hearted, with similarities to hard mode. With a flip back time of a mere 0.2 seconds and each robot is randomly rotated",
        maxImages: 50,
        imgLocation: './images/levels/hard/',
        speed: 200
    }
};

const panel = document.getElementById("panel");

createPanel = () => {
    const title = document.createElement("h1");
    title.textContent = "RoboMatch";
    panel.appendChild(title);

    const menuNav = document.createElement("div");
    menuNav.setAttribute("class", "menuNav");

    const btnOptions = [
        ["Play", "far fa-play-circle"],
        ["Leaderboard", "fas fa-trophy"],
        ["About", "fas fa-info"]
    ];

    btnOptions.forEach(btn => {
        const button = document.createElement("button");
        button.setAttribute("id", `${btn[0].toLowerCase()}Btn`);
        button.setAttribute('onclick', `changeScreen("${btn[0].toLowerCase()}")`);

        if (currentSelections.screen === btn[0].toLowerCase()) button.setAttribute("class", "active")

        const i = document.createElement("i");
        i.setAttribute("class", btn[1]);
        button.appendChild(i);

        const text = document.createElement("p");
        text.textContent = btn[0];
        button.appendChild(text);

        menuNav.appendChild(button);
    });

    panel.appendChild(menuNav)

    displayHome()
};

createInfoPanel = (container, title, desc) => {
    // Create the information window for the play screen
    const infoPanel = document.createElement("div");
    infoPanel.setAttribute("id", "infoPanel");
    infoPanel.setAttribute("class", "infoPanel")

    const infoTitle = document.createElement("h2");
    infoTitle.setAttribute("id", "infoTitle");
    infoTitle.textContent = title;
    infoPanel.appendChild(infoTitle);

    const infoDesc = document.createElement("p");
    infoDesc.setAttribute("id", "infoDesc");
    infoDesc.textContent = desc;
    infoPanel.appendChild(infoDesc);

    container.appendChild(infoPanel);

};

changeScreen = (value) => {
    // Remove existing screens
    const screens = ["playContainer", "leaderContainer", "aboutContainer"];
    screens.forEach(screen => {
        if (document.getElementById(screen) !== null) document.getElementById(screen).remove();
    });

    // Display selected screen
    if (value === "play") displayHome();
    if (value === "leaderboard") displayLeaderboard();
    if (value === "about") displayAbout();
};

displayHome = () => {
    // Create the play container
    const playContainer = document.createElement("div");
    playContainer.setAttribute("id", "playContainer");

    // Create the dropdown
    const ddSpan = document.createElement("span");
    ddSpan.setAttribute("class", "custom-dropdown");

    const dropdown = document.createElement("select");
    Object.keys(levels).forEach(level => {
        let option;
        if (level === "select") option = "select";
        else option = levels[level].name.toLowerCase();
        dropdown.options[dropdown.options.length] = new Option(levels[level].name, option);
    });
    dropdown.setAttribute('onchange', 'changeMode(value);');
    ddSpan.appendChild(dropdown);
    playContainer.appendChild(ddSpan);

    createInfoPanel(
        playContainer,
        levels[currentSelections["mode"]].title,
        levels[currentSelections["mode"]].desc
    );

    panel.appendChild(playContainer);
};

createPanel();

changeMode = (value) => {
    currentSelections.mode = value;
    const infoPanel = document.getElementById("infoPanel");

    // Change title and descriptions 
    document.getElementById("infoTitle").textContent = levels[currentSelections["mode"]].title;
    document.getElementById("infoDesc").textContent = levels[currentSelections["mode"]].desc;

    // Add slider container, removing any that may exist first.
    if (document.getElementById("sliderContainer") !== null) document.getElementById("sliderContainer").remove();
    const sliderContainer = document.createElement("div");
    sliderContainer.setAttribute("id", "sliderContainer");

    // Add slider to container
    const slider = document.createElement("input");
    slider.setAttribute("id", "slider");
    slider.setAttribute("type", `range`);
    slider.setAttribute("min", 5);
    slider.setAttribute("max", levels[currentSelections["mode"]].maxImages);
    slider.setAttribute("value", 20);
    slider.setAttribute("class", "slider");
    slider.oninput = function () { sliderOnchange(slider.value) };
    sliderContainer.appendChild(slider);

    // Add the slider count label. 
    const sliderNumber = document.createElement("div");
    sliderNumber.setAttribute(`id`, `slideNum`);
    sliderNumber.textContent = `20 Images`;
    sliderContainer.appendChild(sliderNumber);

    infoPanel.appendChild(sliderContainer);

    //  Add playgame button
    if (document.getElementById("letsPlayBtn") !== null) document.getElementById("letsPlayBtn").remove();
    const playBtn = document.createElement("button");
    playBtn.setAttribute("id", "letsPlayBtn");
    playBtn.setAttribute('onclick', 'startGame()');
    playBtn.textContent = "Lets Play"
    infoPanel.appendChild(playBtn);
};

sliderOnchange = (value) => {
    document.getElementById("slideNum").textContent = `${value} Images`;
    currentSelections.images = value;
};

displayLeaderboard = () => {
    // Create the leaderboard container
    const leaderContainer = document.createElement("div");
    leaderContainer.setAttribute("id", "leaderContainer");

    createInfoPanel(
        leaderContainer,
        "Overlords",
        "Did you have what it takes to become the best Robo Overlord? You can use the icon in the bottom left to sort and filter the leaderboard."
    );

    const tableCont = document.createElement("div");
    tableCont.setAttribute("style", "overflow-x:auto");
    leaderContainer.appendChild(tableCont)

    const table = document.createElement("table")
    table.setAttribute("id", "table")
    tableCont.appendChild(table)

    const tbody = document.createElement("tbody")
    table.appendChild(tbody)

    const tr = document.createElement("tr")
    tbody.appendChild(tr)

    const headingsArray = ["fas fa-user-ninja", "far fa-star", "far fa-clock", "fas fa-mouse-pointer","fas fa-crosshairs", "fas fa-robot", "fas fa-trophy"]
    headingsArray.forEach(h => {
        const heading = document.createElement("th")
        tr.appendChild(heading)
        
        const i = document.createElement("i")
        i.setAttribute("class", h)
        heading.appendChild(i)
    });
    

    panel.appendChild(leaderContainer);
    fetchLeaders()
};

displayAbout = () => {
    // Create the About container
    const aboutContainer = document.createElement("div");
    aboutContainer.setAttribute("id", "aboutContainer");

    createInfoPanel(
        aboutContainer,
        "Vanillia JS Coding Challenge",
        "To be updated"
    );

    panel.appendChild(aboutContainer);
};
createWon = () => {
    // Displays the Won game panel, when all cards have be found
    const wonContainer = document.createElement("div");
    wonContainer.setAttribute("id", "won");
    wonContainer.setAttribute("class", "panel");

    const title = document.createElement("h1");
    title.textContent = "Congratulations";
    wonContainer.appendChild(title);

    const subTitle = document.createElement("h3");
    subTitle.textContent = "You found all the matching pairs!";
    wonContainer.appendChild(subTitle);

    const cardCont = document.createElement("div");
    cardCont.setAttribute("class", "submitStats");
    wonContainer.appendChild(cardCont);

    const data = [
        ["Difficulty", "far fa-star", currentSelections.mode],
        ["points", "fas fa-trophy", stats.score],
        ["Seconds", "far fa-clock", stats.time],
        ["Image Pairs", "fas fa-robot", currentSelections.images],
        ["Clicks", "fas fa-mouse-pointer", stats.clicks],
        ["Target", "fas fa-crosshairs", stats.target]
    ]

    data.forEach(d => {
        console.log(d)
        const card = document.createElement("div");
        card.setAttribute("class", "subCard");
        
        const icon = document.createElement("i")
        icon.setAttribute("class", d[1])
        card.appendChild(icon)

        const text = document.createElement("h4");
        text.textContent = `${d[2]} `;
        card.appendChild(text);

        const span = document.createElement("span");
        span.textContent = d[0];
        text.appendChild(span)

        cardCont.appendChild(card);
    });

    const submitPanel = document.createElement("div");
    submitPanel.setAttribute("class", "infoPanel");
    wonContainer.appendChild(submitPanel);

    const spTitle = document.createElement("h2");
    spTitle.textContent = "Submit Your Score!"
    submitPanel.appendChild(spTitle);

    const spDesc = document.createElement("p");
    spDesc.textContent = "Why not submit your score to the global leaderboard and see how your compare to other players";
    submitPanel.appendChild(spDesc);

    const spInputLabel = document.createElement("h4")
    spInputLabel.textContent = "Name: "
    submitPanel.appendChild(spInputLabel);

    const spInput = document.createElement("input")
    spInput.setAttribute("id", "nameInput")
    spInput.setAttribute("type", "text")
    spInput.value = username
    spInputLabel.appendChild(spInput);
    

    const rememberLabel = document.createElement("h5");
    rememberLabel.textContent = "Should we remember this name for future use?";
    submitPanel.appendChild(rememberLabel)

    const rememberMe = document.createElement("input");
    rememberMe.setAttribute("type", "checkbox");
    rememberMe.setAttribute("id", "rememberMe");
    if (localStorage.getItem("username")) rememberMe.checked = true
    rememberMe.setAttribute('onclick', `cookieMonster()`);
    rememberLabel.prepend(rememberMe)

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute('onclick', `submitScore()`);
    submitBtn.textContent = "Submit Score"
    submitPanel.appendChild(submitBtn);

    document.getElementById("body").appendChild(wonContainer)

}