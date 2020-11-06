const sql = require("../db.js");
// few to no comments for testing, it'll probably be deleted upon completion
// constructor
const Testing = function(testing) {
  this.PhoneNumber = testing.PhoneNumber;
  this.stringText = testing.stringText;
};

Testing.create = (newTesting, result) => {
  sql.query("INSERT INTO testing SET ?", newTesting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created testing: ", { id: res.insertId, ...newTesting });
    result(null, { id: res.insertId, ...newTesting });
  });

};

Testing.getAll = result => {
  sql.query("SELECT * FROM testing", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("testing: ", res);
    result(null, res);
  });

};

Testing.clean = result => {
  sql.query("DELETE FROM testing WHERE PhoneNumber = 0;", (err, res) => {
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

    console.log("cleaned up null values");
    result(null, res);
  });

};

Testing.remove = (id, result) => {
  sql.query(
    "DELETE FROM testing WHERE idtesting = ?", id,
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

      console.log("removed testing: ", { id: id });
      result(null, res);
    }
  );

};

Testing.updateById = (id, testing, result) => {
  sql.query(
    "UPDATE testing SET PhoneNumber = ?, stringText = ? WHERE idtesting = ?",
    [parseInt(esting.PhoneNumber), testing.stringText, id],
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

      console.log("updated testing: ", { id: id, ...testing });
      result(null, { id: id, ...testing });
    }
  );

};

Testing.selectbyID = (id, result) => {

  sql.query(
    "SELECT  * FROM testing WHERE idtesting = ? ;", id,
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

      console.log("got from testing: ", { id: id });
      result(null,res);
    }
  );

};
module.exports = Testing;
