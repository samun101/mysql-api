//Linking to the db.js file
const sql = require("../db.js");

// constructor for a Classes_taken  object (same values as in table minus ID)
const Classes_taken = function(classes_taken) {
  this.className = classes_taken.className;
  this.requirementID = classes_taken.requirementID;
  this.userID = classes_taken.userID;
  this.yearFulfilled = classes_taken.yearFulfilled
};

//get everything from the classes_taken table, all the previously taken classes for every person
Classes_taken.getAll = result => {
  sql.query("SELECT * FROM classes_taken", (err, res) => {
    //error checking
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

//select all classes a certain person has taken
Classes_taken.selectbyID = (id, result) => {
  sql.query("SELECT  * FROM classes_taken WHERE userID = ? ;", id, (err, res) => {

      //error checking
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      //didn't find anything with the specific ID in the table
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null,res);
    }
  );
};

// adding a classes_taken to the database
Classes_taken.create = (newClasses_Testing, result) => {
  sql.query("INSERT INTO classes_taken SET ?", newClasses_Testing, (err, res) => {
    //error checking
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId});
  });

};

module.exports = Classes_taken;
