const Years = require("../models/year.model.js");
const requirements = require("./requirements.controller.js");
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
