const Years = require("../models/year.model.js");

exports.getAll = (req, res) => {//getting every year for every student in the Years table
  Years.getAll((err, data) => {
    if (err)
      res.status(500).send({//checking if it worked
        message:
          err.message || "Some error occurred while retrieving years."
      });
    else res.send(data);//returning the data recieved from the database
  });
};

exports.selectbyID = (req, res) => {//select a year based off a specific yearID
  yearsId = parseInt(req.params.idyears),
  Years.selectbyID(yearsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {//checking if a year was found with the ID
        res.status(404).send({
          message: `Not found year with id ${req.params.yearsId}.`
        });
      } else {
        res.status(500).send({//checking for errors
          message: "Error retrieving year with id " + req.params.yearsId
        });
      }
    } else res.send(data);//returning the data recieved from the database
  });
};
