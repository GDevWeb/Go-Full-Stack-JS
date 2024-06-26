const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Compte utilisateur créé !" })
        )
        .catch((error) =>
          res.status(400).json({
            error,
            message: "Erreur lors de la création du compte utilisateur",
          })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire identifiant / mot de passe incorrect !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              message: "Paire identifiant / mot de passe incorrect !",
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( //méthode de jwt
              {userId: user._id}, 
              'RANDOM_WEB_SECRET', //clé de cryptage - ici bidon pour le développement
              {expiresIn: '24h'} //temps de validité du token
            ),
          });
        })
        .catch((error) =>
          res.status(500).json({ error, message: "Erreur serveur" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};
