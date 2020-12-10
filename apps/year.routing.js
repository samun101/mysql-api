const year = require("./year.controller.js");
//setting up endpoints for the year table
module.exports = app => {
  app.post("/years", year.create);
  app.get("/years", year.getAll);
  app.get("/years:idyears",year.selectbyID)
  app.put("/years/:idyears",year.update)
};
