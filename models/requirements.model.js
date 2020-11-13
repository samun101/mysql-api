const sql = require("../db.js");
// constructor for the requirements (same as the table)
const Requirements = function(requirements) {
  this.idRequirements = requirements.idRequirements;
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
  //console.log("years: ", res); //logging retrieved data to the console
    result(null, res);
  });

};

Requirements.selectbyMajor = (id, result) => {
  console.log(id)
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
    //console.log("got from requirements: ", { id: id });//logging the retrieved data to the console
      result(null,res);
    }
  );
};
Requirements.selectbyId = function(id, result){
  console.log(id)
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
    //console.log("got from requirements: ", { id: id });//logging the retrieved data to the console
      result(null,res);
      return(res);
    }
  );
};
module.exports = Requirements;
