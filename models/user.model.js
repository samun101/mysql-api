const sql = require("../db.js");
// constructor for the requirements (same as the table)
const User = function(user) {
  this.Name = user.Name;
  this.Phonenumber = user.Phonenumber;
  this.SchoolID = user.SchoolID;
  this.MajorID = user.MajorID;
  this.SemestersTaken = user.SemestersTaken;
  this.Password = user.Password;
};

User.getAll = result => {
  sql.query("SELECT * FROM users;", (err, res) => {//selecting the whole table of users
    if (err) {//error checking
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });

};

User.selectByIdUser = (id, result) => {
  console.log(id)
  sql.query(
    "SELECT  * FROM users WHERE idusers = ?;", id, //selecting the idusers from users
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
    //console.log("got from users: ", { id: id });//logging the retrieved data to the console
      result(null,res);
    }
  );

};
User.selectUsername = (username, password, result) => {
  sql.query('SELECT * FROM users WHERE (Name = ? OR Phonenumber=?);', [username,username],//selecting the idusers from users
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
      //checking to make sure the password is correct
      else{
        try{
          if(res[0].Password == password){
          //logging the retrieved data to the console
            result(null,res);
            return;
          }
        }
        catch{}
        result(null,{message:"incorrect Username or password"})
    }
    }
  );
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res)
    result(null, { id: res.insertId});
  });
};


User.remove = (id, result) => {
  //deleting the user from the database
  sql.query("DELETE FROM users WHERE idusers = ?", id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no user with ID found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("removed user: ", { id: id });
      result(null, res);
    }
  );

};

User.updateById = (id, user, result) => {
  sql.query("UPDATE users SET ? WHERE idusers=?",
    [user, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
      //returning the data from the user updated
      result(null, { id: id, ...user });
    }
  );

};

module.exports = User;
