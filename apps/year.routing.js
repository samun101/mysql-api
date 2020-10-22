  const year = require("./year.controller.js");
module.exports = app => {

  app.get("/years", year.getAll);
  app.get("/years:idyears",year.selectbyID)

};
