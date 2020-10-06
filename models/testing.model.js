const sql = require("./db.js");
// constructor
const Testing = function(testing) {
  this.textTwo = testing.textTwo;
  this.success = testing.success;
  this.uploader = testing.uploader;
};

Testing.create = (newTesting, result) => {
  sql.query("INSERT INTO testing SET ?", newTesting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created testing: ", { id: res.insertId, ...newTesting });
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

Testing.remove = result => {
  console.log("starting deletion");
  sql.query("DELETE FROM testing WHERE success IS null", (err, res) => {
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

Testing.updateById = (id, testing, result) => {
  sql.query(
    "UPDATE testing SET textTwo = ?, success = ?, uploader = ? WHERE idtesting = ?",
    [testing.textTwo, testing.success, testing.uploader, id],
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

module.exports = Testing;
