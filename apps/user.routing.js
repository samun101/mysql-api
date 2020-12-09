const user = require("./user.controller.js");
//setting up endpoints for the user table
module.exports = app => {
  app.get("/user", user.getAll);
  app.get("/user:idUser",user.selectbyIdUser)
  app.get("/login/:username/:password",user.selectUsername)
};
