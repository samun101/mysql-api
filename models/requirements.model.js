const sql = require("../db.js");
// constructor for the requirements (same as the table minus ID)
const Requirements = function(requirements) {
  this.RequirementName = requirements.RequirementName;
  this.majorID = requirements.majorID;
  this.FrequencyOffered = requirements.FrequencyOffered;
  this.SpecificClass = requirements.SpecificClass;
};

Requirements.getAll = result => {
  sql.query("SELECT * FROM requirements;", (err, res) => {//selecting the whole table of requirements
    if (err) {//error checking
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });

};

Requirements.selectbyMajor = (id, result) => {
  sql.query(
    "SELECT  * FROM requirements WHERE MajorID = ? OR MajorID = 21 ;", id, //selecting the requirements from GEs and a specific major
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

      result(null,res);
    }
  );
};
Requirements.selectbyId = function(id, result){
  if(id == null) {return;}
  sql.query(
    "SELECT  * FROM requirements WHERE idRequirements = ?;", id, //selecting the requirements from GEs and a specific major
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

      result(null,res);
      return(res);
    }
  );
};
module.exports = Requirements;
