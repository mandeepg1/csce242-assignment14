const addGame = async (e) => {
  e.preventDefault();
  const form = document.getElementById("add-game-form");
  const formData = new FormData(form);

  formData.append("platform", getGameInfo());
  let response;

  if (form._id.value == -1) {
    formData.delete("_id");

    response = await fetch("/api/games", {
      method: "POST",
      body: formData,
    });
  }

  if (response.status != 200) {
    console.log("ERROR!!!!");
    return;
  }

  document.querySelector(".form-class").classList.add("transparent");
  showGames();
};

const getGameInfo = () => {
  const inputs = document.querySelectorAll("#game-boxes input");
  const info = [];
  inputs.forEach((input) => {
    info.push(input.value);
  });
  return info;
};

const getGames = async () => {
  try {
    return (await fetch("api/games/")).json();
  } catch (error) {
    console.log(error);
  }
};

const showGames = async () => {
  let game = await getGames();

  let gameCol = document.getElementById("game-col");
  gameCol.innerHTML = "";

  game.forEach((game) => {
    const section = document.createElement("section");
    section.classList.add("items");
    gameCol.append(section);

    const a = document.createElement("a");
    a.href = "#";
    section.append(a);

    const h4 = document.createElement("h4");
    h4.innerHTML = game.name;
    a.append(h4);

    a.onclick = () => {
      const details = document.getElementById("game-details");
      details.innerHTML = "";

      const img = document.createElement("img");
      img.src = game.img;
      img.classList.add("game-img");
      details.append(img);

      const h4 = document.createElement("h4");
      details.append(h4);

      const p = document.createElement("p");
      details.append(p);

            
      
      
      h4.innerHTML = game.description;
      p.innerHTML = "Platform: " + game.platform.join(", ") + "<br> Publisher: " + game.publisher;
    };
  });
};

const addGameBoxes = (e) => {
  e.preventDefault();
  const gameBoxes = document.getElementById("game-boxes");
  const input = document.createElement("input");
  input.type = "text";
  gameBoxes.append(input);
};

window.onload = () => {
  showGames();
  document.getElementById("add-section").classList.add("transparent");

  document.getElementById("add-game-intro").addEventListener("click", () => {
    document.getElementById("add-section").classList.remove("transparent");
  });

  document.getElementById("add-game-link").onclick = addGameBoxes;
  document.getElementById("add-game-form").onsubmit = addGame;
};

