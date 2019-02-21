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