const sql = require("./db.js");
// constructor
const Years = function(years) {
  this.rName1 = years.rName1;
  this.requirementID1 = years.requirementID1;
  this.rName1 = years.rName2;
  this.requirementID1 = years.requirementID2;
  this.rName1 = years.rName3;
  this.requirementID1 = years.requirementID3;
  this.rName1 = years.rName4;
  this.requirementID1 = years.requirementID4;
  this.rName1 = years.rName5;
  this.requirementID1 = years.requirementID5;
  this.rName1 = years.rName6;
  this.requirementID1 = years.requirementID6;
  this.rName1 = years.rName7;
  this.requirementID1 = years.requirementID7;
  this.rName1 = years.rName8;
  this.requirementID1 = years.requirementID8;
  this.rName1 = years.rName9;
  this.requirementID1 = years.requirementID9;
  this.rName1 = years.rName10;
  this.requirementID1 = years.requirementID10;
  this.rName1 = years.rName11;
  this.requirementID1 = years.requirementID11;
  this.rName1 = years.rName12;
  this.requirementID1 = years.requirementID12;
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
