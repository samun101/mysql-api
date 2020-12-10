// linking to the schedule.model.js file
const Schedule = require("../models/schedule.model.js");
const Year = require("../models/year.model.js");

// sending everything from the schedule table
exports.getAll = (req, res) => {
  Schedule.getAll((err, data) => {

    //error checking
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving years."
      });

    //sending recieved data to the user
    else res.send(data);
  });
};

// sending a specific schedule with a specific id
exports.selectbyID = (req, res) => {
  scheduleId = parseInt(req.params.idschedule),
  Schedule.selectbyID(scheduleId, (err, data) => {
    if (err) {
      // addressing if nothing is found with the schedule ID
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year with id ${req.params.scheduleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving year with id " + req.params.scheduleId
        });
      }
    }
    //sending recieved data to they user calling the API
    else res.send(data);
  });
};
