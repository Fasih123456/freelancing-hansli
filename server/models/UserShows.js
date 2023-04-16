const db = require("../util/sql");

//This class handles which user has which favorite shows(This is a many to many relationship)`
module.exports = class UserShows {
  constructor(userid, showid) {
    this.userid = userid;
    this.showid = showid;
  }

  save() {
    return db.execute("INSERT INTO user_shows (user_id, show_id) VALUES (?, ?)", [
      this.userid,
      this.showid,
    ]);
  }

  async findOrCreate() {
    const [rows] = await db.execute("SELECT * FROM user_shows WHERE user_id = ? AND show_id = ?", [
      this.userid,
      this.showid,
    ]);
    if (rows.length > 0) {
      return new UserShows(rows[0].userid, rows[0].showid);
    } else {
      const userShow = new UserShows(this.userid, this.showid);
      await userShow.save();
      return userShow;
    }
  }
};
