const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./models/thing");
const app = express();

// Connexion à MongoDB
mongoose
  .connect(
    "mongodb+srv://gdevweb:OcEUPP3BSLtqFrbw@tuto-nodejs.m2u0gbo.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée :", error));

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour gérer les CORS
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

// Route POST pour ajouter un objet
app.post("/api/stuff", (req, res, next) => {
  console.log("Corps de la requête:", req.body);
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement:", error);
      res.status(400).json({ error });
    });
});

// Route PUT pour modifier un objet
app.put("/api/stuff/:id", (req, res, next) => {
  console.log("ID:", req.params.id);
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(404).json({ error }));
});

// Route GET pour récupérer les détails d'un objet
app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ message: "Objet non trouvé !" }));
});

// Route GET pour récupérer la liste des objets
app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

// Route DELETE pour supprimer un objet
app.delete("/api/stuff/:id", (req, res, next) => {
  console.log("ID:", req.params.id);
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Erreur lors de la suppression de l'objet !" })
    );
});

module.exports = app;
