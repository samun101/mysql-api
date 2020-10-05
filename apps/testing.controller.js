const Testing = require("../models/testing.model.js");

exports.create = (req, res) => {
  console.log(res);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a testing
  const testing = new Testing ({
    textTwo: req.body.textTwo,
    success: req.body.success,
    uploader: req.body.uploader
  });

  // Save testing in the database
  Testing.create(testing, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the testing."
      });
      // Create a Customer
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Testing.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving testing."
      });
    else res.send(data);
  });
};

exports.remove = (req, res) => {
  Testing.remove((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No empty values found.`
        });
      } else {
        res.status(500).send({
          message: "Could not clean database"
        });
      }
    } else res.send({ message: `testing was cleaned successfully!` });
  });
}


exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.params.testingId)
  //actually updating
  Testing.updateById(
    req.params.testingId,
    new Testing(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found testing with id ${req.params.testingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating testing with id " + req.params.testingId
          });
        }
      } else res.send(data);
    }
  );
};
