const sql = require("../db.js");
// constructor for the requirements (same as the table)
const User = function(user) {
  this.Name = users.Name;
  this.PhoneNumber= users.Phonenumber;
  this.SchoolID = users.SchoolID;
  this.MajorID = users.MajorID;
};

User.getAll = result => {
  sql.query("SELECT * FROM users;", (err, res) => {//selecting the whole table of users
    if (err) {//error checking
      console.log("error: ", err);
      result(null, err);
      return;
    }
  //console.log("users: ", res); //logging retrieved data to the console
    result(null, res);
  });

};

User.selectByIdUser = (id, result) => {
  console.log(id)
  sql.query(
    "SELECT  * FROM users WHERE idusers = ?;", id, //selecting the idusers from users
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
    //console.log("got from users: ", { id: id });//logging the retrieved data to the console
      result(null,res);
    }
  );

};
module.exports = User;
