// linking to the schedule.model.js file
const Schedule = require("../models/schedule.model.js");

exports.create = (req, res) => {
  //console.log(res);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Schedule to be sent to database
  const schedule = new Schedule ({
    userID: req.body.userID,
    schedulesName:req.body.schedulesName,
    yName1:req.body.yName1,
    yearID1:req.body.yearID1,
    yName2:req.body.yName2,
    yearID2:req.body.yearID2,
    yName3:req.body.yName3,
    yearID3:req.body.yearID3,
    yName4:req.body.yName4,
    yearID4:req.body.yearID4
  });

  // Save schedule in the database
  Schedule.create(schedule, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Schedule."
      });
      // Create a schedule to be saved
    else res.send(data);
  });
};

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

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //actually updating
  Schedule.updateById(
    parseInt(req.params.idschedule),
    new Schedule(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found schedule with id ${req.params.idschedule}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating testing with id " + req.params.idschedule
          });
        }
      }
      //sending the data sent by the database to they user
      else res.send(data);
    }
  );
};

exports.remove = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  scheduleId = parseInt(req.params.idschedule),
  Schedule.remove(scheduleId,(err, data) => {
    if (err) {

      if (err.kind === "not_found") {
        res.status(404).send({
          message: `value not found.`
        });
      } else {
        res.status(500).send({
          message: "Could not empty data from database"
        });
      }
    } else res.send({ message: `Data removed successfully` });
  });
}
