const User = require("../models/user.model.js");

exports.getAll = (req, res) => {//get all the users in the user table
  User.getAll((err, data) => {
    if (err)//error checking
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);//sending recieved data
  });
};

exports.selectbyIdUser = (req, res) => {//select a user by their ID
  idUser = parseInt(req.params.idUser),
  User.selectByIdUser(idUser, (err, data) => {
    if (err) {//error checking
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.idUser}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.idUser
        });
      }
    } else res.send(data);//sending recieved data
  });
};

exports.selectUsername = (req, res) => {//select a user by their ID
  username = req.params.username
  password = req.params.password,
  User.selectUsername(username,password, (err, data) => {
    //error checking
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Login failed, password or username incorrect.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with name " + req.params.username
        });
      }
    }
    //sending recieved data
    res.send(data);
  });
};
