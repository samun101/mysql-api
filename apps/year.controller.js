const Years = require("../models/year.model.js");

//getting every year for every student in the Years table
exports.getAll = (req, res) => {
  Years.getAll((err, data) => {
    if (err)
    //checking if it worked
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });
    //returning the data recieved from the database
    else res.send(data);
  });
};
//saving a year into the database
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a year to be saved
  const year = new Years ({
    rName1: req.body.rName1,
    requirementID1: req.body.requirementID1,
    rName2: req.body.rName2,
    requirementID2: req.body.requirementID2,
    rName3: req.body.rName3,
    requirementID3: req.body.requirementID3,
    rName4: req.body.rName4,
    requirementID4: req.body.requirementID4,
    rName5: req.body.rName5,
    requirementID5: req.body.requirementID5,
    rName6: req.body.rName6,
    requirementID6: req.body.requirementID6,
    rName7: req.body.rName7,
    requirementID7: req.body.requirementID7,
    rName8: req.body.rName8,
    requirementID8: req.body.requirementID8,
    rName9: req.body.rName9,
    requirementID9: req.body.requirementID9,
    rName10: req.body.rName10,
    requirementID10: req.body.requirementID10,
    rName11: req.body.rName11,
    requirementID11: req.body.requirementID11,
    rName12: req.body.rName12,
    requirementID12: req.body.requirementID12
  });

  // Save year in the database
  Years.create(year, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the year."
      });
    // sending the ID of the year to the user
    else res.send(data);
  });
};
//select a year based off a specific yearID
exports.selectbyID = (req, res) => {
  yearsId = parseInt(req.params.idyears),
  Years.selectbyID(yearsId, (err, data) => {
    if (err) {
      //checking if a year was found with the ID
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.yearsId}.`
        });
      } else {
        //checking for errors
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.yearsId
        });
      }
      //returning the data recieved from the database
    } else {res.send(data); }
  });
};

//select a year based off a specific yearID
exports.selectbyIDClean = (req, res) => {
  yearsId = parseInt(req.params.idyears),
  Years.selectbyIDClean(yearsId, (err, data) => {
    if (err) {
      //checking if a year was found with the ID
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.yearsId}.`
        });
      } else {
        //checking for errors
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.yearsId
        });
      }
      //returning the data recieved from the database
    } else {res.send(data); }
  });
};


exports.update = (req, res) => {
  // Validate that the information sent isn't empty
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //actually updating the year
  Years.updateById(
    parseInt(req.params.idyears),
    new Years(req.body),
    (err, data) => {
      //checking to make sure information was sent properly
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found year with id ${req.params.idyears}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating year with id " + req.params.idyears
          });
        }
      }
      //sending the data from the database to the user who called the API
      else res.send(data);
    }
  );
};
