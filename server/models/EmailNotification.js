const db = require("../util/sql");

//This class handles all the notification which has been sent to the user
module.exports = class EmailNotification {
  constructor(id, userid, showid, sent) {
    this.id = id;
    this.userid = userid;
    this.showid = showid;

    this.sent = sent;
  }

  async findOrCreate() {
    const [rows] = await db.execute(
      "SELECT * FROM email_notifications WHERE userid = ? AND showid = ?",
      [this.userid, this.showid]
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      this.save();
    }
  }

  save() {
    return db.execute("INSERT INTO email_notifications (userid, showid, sent) VALUES (?, ?, ?)", [
      this.userid,
      this.showid,
      this.sent,
    ]);
  }
};
