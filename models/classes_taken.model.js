const sql = require("../db.js");
// constructor for a Classes_Testing (same values as in table minus ID)
const Classes_taken = function(classes_taken) {
  this.className = classes_taken.className;
  this.requirementID = classes_taken.requirementID;
  this.userID = classes_taken.userID;
  this.yearFulfilled = classes_taken.yearFulfilled
};

Classes_taken.getAll = result => {//get everything from the classes_taken table, all the previously taken classes for every person
  sql.query("SELECT * FROM classes_taken", (err, res) => {
    if (err) {//error checking
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("classes_taken: ", res);//printing recieved data to log
    result(null, res);
  });
};

Classes_taken.selectbyID = (id, result) => {//select all classes a certain person has taken
  sql.query(
    "SELECT  * FROM classes_taken WHERE userID = ? ;", id,
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

Classes_taken.create = (newClasses_Testing, result) => { // adding a classes_taken to the database
  sql.query("INSERT INTO classes_taken SET ?", newClasses_Testing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created testing: ", { id: res.insertId, ...newTesting });
    result(null, { id: res.insertId});
  });

};

module.exports = Classes_taken;
