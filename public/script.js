const getVideoGames = async() => {
    try {
        return (await fetch("api/games/")).json();
    } catch (error) {
        console.log(error);
    }
};

const showGames = async() => {
    let games = await getVideoGames();
    let gameList = document.getElementById("game-list");
    gameList.innerHTML = "";
    games.forEach((game) => {
        const section = document.createElement("section");
        section.classList.add("game");
        gameList.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const img = document.createElement("img");
        img.src =  game.img;
        img.classList.add("intro-img");
        a.append(img);

        const h3 = document.createElement("h3");
        h3.innerHTML = game.name;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayDetails(game);
        };
    });
};


const displayDetails = (game) => {
    const gameDetails = document.getElementById("vgame-details");
    gameDetails.innerHTML = "";

    const img = document.createElement("img");
    img.src =  game.img;
    gameDetails.append(img);

    const h3 = document.createElement("h3");
    h3.innerHTML = game.name;
    gameDetails.append(h3);

    const dLink = document.createElement("a");
    dLink.innerHTML = "	&#x2715;";
    gameDetails.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    gameDetails.append(eLink);
    eLink.id = "edit-link";

    const p = document.createElement("p");
    gameDetails.append(p);
    p.innerHTML = game.description;

    const ul = document.createElement("ul");
    gameDetails.append(ul);

    // Create <li> elements for platform, publisher, and rating
    const platformLi = document.createElement("li");
    platformLi.textContent = `Platform: ${game.platform.join(", ")}`;
    ul.append(platformLi);

    const publisherLi = document.createElement("li");
    publisherLi.textContent = `Publisher: ${game.publisher}`;
    ul.append(publisherLi);

    const ratingLi = document.createElement("li");
    ratingLi.textContent = `Rating: ${game.rating}`;
    ul.append(ratingLi);

    eLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("add-edit-title").innerHTML = "Edit Recipe";
    };

    dLink.onclick = (e) => {
        e.preventDefault();
        //delete recipe
    };

    populateEditForm(game);
};

const populateEditGameForm = (game) => {
    // ... (unchanged code)
};

const addEditGame = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-edit-game-form");
    const formData = new FormData(form);
    let response;

    if (form._id.value == -1) {
        formData.delete("_id");
        formData.delete("img");
        formData.append("game_info", getGameInfo());

        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        const jsonData = JSON.stringify(jsonObject);

        response = await fetch("/api/games", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        });

        // Check for errors
        if (response.status !== 200) {
            console.error("Error posting data. Status:", response.status);
            
            // Use .text() with .then to handle the promise
            response.text().then(errorResponseText => {
                console.error("Error response:", errorResponseText);
            });
        } else {
            // If successful, continue with the rest of your logic
            resetForm();
            document.querySelector(".dialog").classList.add("transparent");
            showGames();
        }
    }
};



const getGameInfo = () => {
    const inputs = document.querySelectorAll("#info-boxes input");
    let game_info = [];

    inputs.forEach((input) => {
        game_info.push(input.value);
    });

    return game_info;
};

const resetForm = () => {
    const form = document.getElementById("add-edit-game-form");
    form.reset();
    form._id = "-1";
    document.getElementById("info-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Adding Game";
    resetForm();
};

const addGameInfo = (e) => {
    e.preventDefault();
    const section = document.getElementById("info-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

window.onload = () => {
    showGames();
    document.getElementById("add-edit-game-form").onsubmit = addEditGame;
    document.getElementById("add-game-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-info").onclick = addGameInfo;
};