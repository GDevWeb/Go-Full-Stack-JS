const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    `mongodb+srv://gdevweb:<8ABdPyAodI2TVSVa>@tuto-nodejs.m2u0gbo.mongodb.net/?retryWrites=true&w=majority&appName=Tuto-NodeJS`,
    {
      useNewURlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json()); //permet de recevoir des données au format json et donne accès au corps de la requête

// Middleware :
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// création d'une nouvelle route POST :
app.post("/api/stuff", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    //si pas de res la requête côté client va planter
    message: "Objet créé !",
  });
});

app.get("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});
module.exports = app;
