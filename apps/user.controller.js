const User = require("../models/user.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a user object
  const user = new User ({
    Name: req.body.Name,
    Phonenumber: req.body.Phonenumber,
    SchoolID:req.body.SchoolID,
    MajorID:req.body.MajorID,
    SemestersTaken:req.body.SemestersTaken,
    Password:req.body.Password
  });

  // Save new user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving the new user."
      });
      // Create a new user
    else res.send(data);
  });
};

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
  password = req.params.password
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


exports.remove = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  //making sure that the id passed to us is an integer
  idUser = parseInt(req.params.idUser),
  User.remove(idUser,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found.`
        });
      } else {
        res.status(500).send({
          message: "Could not empty from database"
        });
      }
    }
    //sending confirmation message to client calling APIs
    else res.send({ message: `User was removed from database successfully!` });
  });
}
