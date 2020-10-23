const schedule = require("./schedule.controller.js");
module.exports = app => {

  app.get("/schedule", schedule.getAll);
  app.get("/schedule:idschedule",schedule.selectbyID)

};
