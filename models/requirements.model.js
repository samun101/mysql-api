const sql = require("./db.js");
// constructor
const Requirements = function(requirements) {
  this.idRequirements = requirements.idRequirements;
  this.RequirementName = requirements.RequirementName;
  this.majorID = requirements.majorID;
  this.FrequencyOffered = requirements.FrequencyOffered;
  this.SpecificClass = requirements.SpecificClass;
};

Requirements.getAll = result => {
  sql.query("SELECT * FROM requirements;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("years: ", res);
    result(null, res);
  });

};

Requirements.selectbyMajor = (id, result) => {
  console.log(id)
  sql.query(
    "SELECT  * FROM requirements WHERE MajorID = ? OR MajorID = 21 ;", id,
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
module.exports = Requirements;
