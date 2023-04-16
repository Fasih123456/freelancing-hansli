const db = require("../util/sql");

//This class handles the list of all the shows which has at least 1 favorite user
module.exports = class Shows {
  constructor(id, name, start_time, end_time, day) {
    this.id = id;
    this.name = name;
    this.start_time = start_time;
    this.end_time = end_time;
    this.day = day;
  }

  async findOrCreate() {
    // Check if the show already exists
    const [rows, fields] = await db.execute("SELECT * FROM shows WHERE id = ?", [this.id]);

    if (rows.length > 0) {
      // The show already exists in the database, so return it
      return rows[0];
    } else {
      // The show doesn't exist, so insert it into the database
      const [result, fields] = await db.execute(
        "INSERT INTO shows (id, name, start_time, end_time, day) VALUES (?, ?, ?, ?, ?)",
        [this.id, this.name, this.start_time, this.end_time, this.day]
      );

      // Return the newly created show object
      return {
        id: this.id,
        name: this.name,
        state_time: this.state_time,
        end_time: this.end_time,
      };
    }
  }
};
