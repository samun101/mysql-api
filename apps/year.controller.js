const Years = require("../models/year.model.js");

exports.getAll = (req, res) => {
  Years.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });
    else res.send(data);
  });
};

exports.selectbyID = (req, res) => {
  yearsId = parseInt(req.params.idyears),
  Years.selectbyID(yearsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.yearsId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.yearsId
        });
      }
    } else res.send(data);
  });
};
