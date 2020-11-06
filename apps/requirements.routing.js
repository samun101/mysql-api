const requirements = require("./requirements.controller.js");
//setting up endpoints for the requirements table
module.exports = app => {
  app.get("/requirements", requirements.getAll);
  app.get("/requirements:idMajor",requirements.selectbyMajor)
};
