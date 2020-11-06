const schedule = require("./schedule.controller.js");
//setting up endpoints for the schedule table
module.exports = app => {
  app.get("/schedule", schedule.getAll);
  app.get("/schedule:idschedule",schedule.selectbyID)
};
