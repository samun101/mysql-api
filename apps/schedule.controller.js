const Schedule = require("../models/schedule.model.js");

exports.getAll = (req, res) => {//get everything from the schedule table
  Schedule.getAll((err, data) => {
    if (err)//error checking
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });
    else res.send(data);//sending recieved data
  });
};

exports.selectbyID = (req, res) => {//select a specific schedule with a specific id
  scheduleId = parseInt(req.params.idschedule),
  Schedule.selectbyID(scheduleId, (err, data) => {
    if (err) {//error checking
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.scheduleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.scheduleId
        });
      }
    } else res.send(data);//sending recieved data
  });
};
