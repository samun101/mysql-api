const sql = require("../db.js");
// constructor, reflects the years table in the database without ID
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

Years.getAll = result => {//getting everything from the years, for all students
  sql.query("SELECT * FROM years", (err, res) => {
    if (err) {
      console.log("error: ", err);//checking for errors
      result(null, err);
      return;
    }
  //  console.log("years: ", res);//logging the data recieved from the database
    result(null, res);
  });

};

Years.selectbyID = (id, result) => {//selecting a year based off a given ID
  sql.query(
    `SELECT  * FROM years WHERE idyears = ?;
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid1 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid2 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid3 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid4 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid5 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid6 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid7 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid8 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid9 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid10 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid11 FROM years where idyears = ?);
    SELECT * FROM requirements WHERE idRequirements in (SELECT requirementid12 FROM years where idyears = ?);`
    ,[id,id,id,id,id,id,id,id,id,id,id,id,id],
    (err, res) => {
      if (err) {//checking for errors
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {//no year with the given ID is found
        result({ kind: "not_found" }, null);
        return;
      }
    //  console.log("got from years: ", { id: id });//logging the data from the database to the console
      result(null,res);
      return(res)
    }
  );
};

Years.selectbyIDClean = (id, result) => {//selecting a year based off a given ID
  sql.query(
    `SELECT  * FROM years WHERE idyears = ?;`
    ,id,
    (err, res) => {
      if (err) {//checking for errors
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {//no year with the given ID is found
        result({ kind: "not_found" }, null);
        return;
      }
    //  console.log("got from years: ", { id: id });//logging the data from the database to the console
      result(null,res);
      return(res)
    }
  );
};


//save a year into the database
Years.create = (newYear, result) => {
  sql.query("INSERT INTO years SET ?", newYear, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId});
  });

};
//update a year currently in the database
Years.updateById = (id, year, result) => {
  sql.query(
    "UPDATE years SET ? WHERE idyears = ?",
    [year, id],
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
      //returning the id and content of the updated year
      result(null, { id: id, ...year });
    }
  );

};
module.exports = Years;
