const testing = require("./testing.controller.js");
//setting up endpoints for the testing table
module.exports = app => {
  app.post("/testing", testing.create);
  app.get("/testing", testing.getAll);
  app.get("/testing:testingId",testing.selectbyID)
  app.delete("/testing", testing.clean);
  app.delete("/testing:testingId", testing.remove);
  app.put("/testing:testingId", testing.update);
};
