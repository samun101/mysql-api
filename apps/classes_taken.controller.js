const Classes_taken = require("../models/classes_taken.model.js");

exports.getAll = (req, res) => {//get everything from the schedule table
  Classes_taken.getAll((err, data) => {
    if (err)//error checking
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });
    else res.send(data);//sending recieved data
  });
};

exports.selectbyID = (req, res) => {//select a specific schedule with a specific id
  userId = parseInt(req.params.userID),
  Classes_taken.selectbyID(userId, (err, data) => {
    if (err) {//error checking
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.userID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.userID
        });
      }
    } else res.send(data);//sending recieved data
  });
};

exports.create = (req, res) => {
  console.log(res);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a testing
  const classes_taken = new Classes_taken ({
    className: req.body.className,
    requirementID: req.body.requirementID,
    userID: req.body.userID,
    yearFulfilled: req.body.yearFulfilled
  });

  // Save testing in the database
  Classes_taken.create(classes_taken, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the testing."
      });
      // Create a Customer
    else res.send(data);
  });
};
