const express = require("express");
const mongoose = require("mongoose");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/users");

const path = require("path");

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

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images/", express.static(path.join(__dirname, "images")));

module.exports = app;
