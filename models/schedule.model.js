const sql = require("./db.js");
// constructor
const schedule = function(schedule) {
  this.Name = schedule.UserID;
  this.schedulesName = schedule.schedulesName;
  this.yearID1 = schedule.yearID1;
  this.yearID2 = schedule.yearID2;
  this.yearID3 = schedule.yearID3;
  this.yearID4 = schedule.yearID4;
};

Years.getAll = result => {
  sql.query("SELECT * FROM years", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("years: ", res);
    result(null, res);
  });

};

Years.selectbyID = (id, result) => {
  console.log(id)
  sql.query(
    "SELECT  * FROM years WHERE idyears = ? ;", id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("got from years: ", { id: id });
      result(null,res);
    }
  );

};
module.exports = Years;
