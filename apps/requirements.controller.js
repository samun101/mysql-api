const Requirements = require("../models/requirements.model.js");

exports.getAll = (req, res) => {
  Requirements.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });
    else res.send(data);
  });
};

exports.selectbyMajor = (req, res) => {
  idMajor = parseInt(req.params.idMajor),
  Requirements.selectbyMajor(idMajor, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.idMajor}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.idMajor
        });
      }
    } else res.send(data);
  });
};
