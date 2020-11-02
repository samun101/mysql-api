const sql = require("./db.js");
// constructor
const Years = function(years) {
  this.rName1 = years.rName1;
  this.requirementID1 = years.requirementID1;
  this.rName2 = years.rName2;
  this.requirementID2 = years.requirementID2;
  this.rName3 = years.rName3;
  this.requirementID3 = years.requirementID3;
  this.rName4 = years.rName4;
  this.requirementID4 = years.requirementID4;
  this.rName5 = years.rName5;
  this.requirementID5 = years.requirementID5;
  this.rName6 = years.rName6;
  this.requirementID6 = years.requirementID6;
  this.rName7 = years.rName7;
  this.requirementID7 = years.requirementID7;
  this.rName8 = years.rName8;
  this.requirementID8 = years.requirementID8;
  this.rName9 = years.rName9;
  this.requirementID9 = years.requirementID9;
  this.rName10 = years.rName10;
  this.requirementID10 = years.requirementID10;
  this.rName11 = years.rName11;
  this.requirementID11 = years.requirementID11;
  this.rName12 = years.rName12;
  this.requirementID12 = years.requirementID12;
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
