  const testing = require("./testing.controller.js");
module.exports = app => {


  // Create a new testing
  app.post("/testing", testing.create);

  app.get("/testing", testing.getAll);

//  app.delete("/testing", testing.clean);
  app.delete("/testing:testingId", testing.remove);
  app.put("/testing:testingId", testing.update);
};
