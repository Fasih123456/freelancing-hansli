const db = require("../util/sql");

//This class handles all the users which have logged in to the web app
module.exports = class Users {
  constructor(id, name, email, wantsEmail) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.wantsEmail = wantsEmail;
  }

  async findOrCreate() {
    let [rows, fields] = await db.execute("SELECT * FROM users WHERE name = ? AND email = ?", [
      this.name,
      this.email,
    ]);

    if (rows.length > 0) {
      // User already exists, mark them as the currentUser
      return rows[0];
    } else {
      // User doesn't exist, create them in the SQL database
      [rows, fields] = await db.execute(
        //TODO: we need to define userid, it will be the first 8 digits of google id
        "INSERT INTO users (id, name, email, wantsEmail) VALUES (?, ?, ?, ?)",
        [
          this.id,
          this.name,
          this.email,
          0, // Default to not sending emails
        ]
      );

      this.id = rows.insertId;
      return this;
    }
  }

  static async updatePreference(id, preference) {
    let [rows, fields] = await db.execute("UPDATE users SET wantsEmail = ? WHERE id = ?", [
      preference,
      id,
    ]);
  }
};
