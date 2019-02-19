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
    fetch('https://robomatch-backend.herokuapp.com/view')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
}

fetchLeaders()