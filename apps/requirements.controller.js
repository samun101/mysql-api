const Requirements = require("../models/requirements.model.js");

exports.getAll = (req, res) => {//get all the requirements in the requirements table
  Requirements.getAll((err, data) => {
    if (err)//error checking
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });
    else res.send(data);//sending recieved data
  });
};

exports.selectbyMajor = (req, res) => {//select all the requirements of a given major
  idMajor = parseInt(req.params.idMajor),
  Requirements.selectbyMajor(idMajor, (err, data) => {
    if (err) {//error checking
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.idMajor}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.idMajor
        });
      }
    } else res.send(data);//sending recieved data
  });
};
