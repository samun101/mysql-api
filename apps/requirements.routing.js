const requirements = require("./requirements.controller.js");
module.exports = app => {

  app.get("/requirements", requirements.getAll);
  app.get("/requirements:idMajor",requirements.selectbyMajor)
};
