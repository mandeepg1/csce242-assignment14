const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let games = [{
        _id: 1,
        name: "God of War",
        platform: ["PS4", "PS5", "XBOX One", "PC", "Steam"],
        publisher: "Sony Interactive Entertainment",
        rating: 4,
        description: "God of War (2018) is a critically acclaimed action-adventure video game that follows Kratos, a former Greek god, and his son Atreus as they embark on a deeply emotional journey through the realms of Norse mythology, featuring stunning visuals, intense combat, and a compelling father-son narrative.",
        img: "images/god-of-war.jpg",
    },
    {
        _id: 2,
        name: "God of War",
        platform: ["PS4", "PS5", "XBOX One", "PC", "Steam"],
        publisher: "Sony Interactive Company",
        rating: 4,
        description: "Extra soft and bannanny",
        img: "images/god-of-war.jpg",
    },
    {
        _id: 3,
        name: "God of War",
        platform: ["PS4", "PS5", "XBOX One", "PC", "Steam"],
        publisher: "Sony Entertainment Company",
        rating: 4,
        description: "Extra soft and bannanny",
        img: "images/god-of-war.jpg",
    },
    {
        _id: 4,
        name: "God of War",
        platform: ["PS4", "PS5", "XBOX One", "PC", "Steam"],
        publisher: "Sony Entertainment Company",
        rating: 4,
        description: "Extra soft and bannanny",
        img: "images/god-of-war.jpg",
    },
    {
        _id: 5,
        name: "God of War",
        platform: ["PS4", "PS5", "XBOX One", "PC", "Steam"],
        publisher: "Sony Entertainment Company",
        rating: 4,
        description: "Extra soft and bannanny",
        img: "images/god-of-war.jpg",
    },
    {
        _id: 6,
        name: "God of War",
        platform: ["PS4", "PS5", "XBOX One", "PC", "Steam"],
        publisher: "Sony Entertainment Company",
        rating: 4,
        description: "Extra soft and bannanny",
        img: "images/god-of-war.jpg",
    },
];

app.get("/api/games", (req, res) => {
    res.send(games);
});

app.post("/api/games", upload.single("img"), (req, res) => {
    const result = validateGame(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const game = {
        _id: games.length + 1,
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients.split(",")
    }

    games.push(game);
    res.send(games);
});

const validateGame = (game) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        platform: Joi.allow(""),
        publisher: Joi.allow(""),
        rating: Joi.allow(""),
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required()
    });

    return schema.validate(game);
};

app.listen(3000, () => {
    console.log("listening");
})
