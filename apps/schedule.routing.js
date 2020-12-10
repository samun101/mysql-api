//linking to the schedule.controller.js file
const schedule = require("./schedule.controller.js");

//setting up endpoints for the schedule table
module.exports = app => {
  app.post("/schedule", schedule.create);
  app.get("/schedule", schedule.getAll);
  app.get("/schedule/:idschedule",schedule.selectbyID)
  app.put("/schedule/:idschedule", schedule.update);
};
