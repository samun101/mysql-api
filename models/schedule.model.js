const sql = require("../db.js");
// constructor for a schedule (same values as in table minus ID)
const Schedule = function(schedule) {
  this.userID = schedule.userID;
  this.schedulesName = schedule.schedulesName;
  this.yearID1 = schedule.yearID1;
  this.yearID2 = schedule.yearID2;
  this.yearID3 = schedule.yearID3;
  this.yearID4 = schedule.yearID4;
};

Schedule.getAll = result => {//get everything from the Schedules table, all the schedules for every person
  sql.query("SELECT * FROM schedules", (err, res) => {
    if (err) {//error checking
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("schedule: ", res);//printing recieved data to log
    result(null, res);
  });
};

Schedule.selectbyID = (id, result) => {//select a specific schedule
  //console.log(id)
  sql.query(
    "SELECT  * FROM schedules WHERE idschedules = ? ;", id,
    (err, res) => {
      if (err) {//error checking
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {//didn't find anything but ran successfully
        result({ kind: "not_found" }, null);
        return;
      }

      //console.log("got from sched: ", { id: id });//logging data recieved to the console
      result(null,res);
    }
  );
};

module.exports = Schedule;
