// linking to the classes_taken.model.js file
const Classes_taken = require("../models/classes_taken.model.js");

//get everything from the classes_taken table
exports.getAll = (req, res) => {
  Classes_taken.getAll((err, data) => {
    //error checking
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });
    //sending recieved data to the user calling the API
    else res.send(data);
  });
};

//select all classes_taken with a specific id
exports.selectbyID = (req, res) => {
  userId = parseInt(req.params.userID),
  Classes_taken.selectbyID(userId, (err, data) => {
    if (err) {
      //responding if no data found with teh given ID
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.userID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving classes_taken with id " + req.params.userID
        });
      }
      //sending recieved data to the user calling the API
    } else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request isn't empty
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a classes_taken object
  const classes_taken = new Classes_taken ({
    className: req.body.className,
    requirementID: req.body.requirementID,
    userID: req.body.userID,
    yearFulfilled: req.body.yearFulfilled
  });

  // Save classes_taken in the database
  Classes_taken.create(classes_taken, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the classes_taken."
      });
      // Send data returned from the database to the user who sent data
    else res.send(data);
  });
};
