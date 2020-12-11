const sql = require("../db.js");
// constructor for a schedule (same values as in table minus ID)
const Schedule = function(schedule) {
  this.userID = schedule.userID;
  this.schedulesName = schedule.schedulesName;
  this.yName1 = schedule.yName1;
  this.yearID1 = schedule.yearID1;
  this.yName2 = schedule.yName2;
  this.yearID2 = schedule.yearID2;
  this.yName3 = schedule.yName3;
  this.yearID3 = schedule.yearID3;
  this.yName4 = schedule.yName4;
  this.yearID4 = schedule.yearID4;
};

//save a schedule into the database
Schedule.create = (newSchedule, result) => {
  sql.query("INSERT INTO schedules SET ?", newSchedule, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId});
  });

};

Schedule.getAll = result => {//get everything from the Schedules table, all the schedules for every person
  sql.query("SELECT * FROM schedules", (err, res) => {
    if (err) {//error checking
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Schedule.selectbyID = (id, result) => {//select a specific schedule
  //console.log(id)
  sql.query(
    "SELECT  * FROM schedules WHERE userID = ? ;", id,
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

      result(null,res);
    }
  );
};


Schedule.updateById = (id, schedule, result) => {
  sql.query(
    "UPDATE schedules SET ? WHERE  idschedules = ?",
    [schedule, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found schedule with the id
        result({ kind: "not_found" }, null);
        return;
      }
      //returning the updated schedule to the user who called update
      result(null, { id: id, ...schedule });
    }
  );

};

Schedule.remove = (id, result) => {
  sql.query(
    `DELETE FROM years WHERE idyears IN (
    (SELECT yearID1 FROM schedules WHERE idschedules =?),
    (SELECT yearID2 FROM schedules WHERE idschedules=?),
    (SELECT yearID3 FROM schedules WHERE idschedules=?),
    (SELECT yearID4 FROM schedules WHERE idschedules=?));
    DELETE FROM schedules WHERE idschedules = ?;` , [id,id,id,id,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found schedule with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    }
  );

};

module.exports = Schedule;
