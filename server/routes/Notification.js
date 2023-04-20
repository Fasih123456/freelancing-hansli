const Shows = require("../models/Shows");
const Users = require("../models/Users");
const EmailNotifications = require("../models/EmailNotification");
const UsersShows = require("../models/UserShows");
const express = require("express");
const router = require("express").Router();
require("dotenv").config();

router.post("/api/reminders", async (req, res) => {
  //console.log(req.body);
  const longId = req.body.userid;
  const userId = longId.toString().slice(0, 8);
  const id = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000; //Give an ID between 1000 to 100000
  let showid = 0;

  if (req.body.id == "") {
    showid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  } else {
    showid = req.body.id;
  }

  const show = new Shows(
    showid,
    req.body.name,
    req.body.start_time,
    req.body.end_time,
    req.body.day
  );

  //console.log(show);

  const showDetails = await show.findOrCreate();

  const userShow = new UsersShows(userId, showid);

  //console.log(userShow);
  const userShowDetails = await userShow.findOrCreate();

  //console.log(req.body.start_time);

  let time = subtract15Minutes(req.body.start_time); //This will be in the format of HH:MM

  const emailNotification = new EmailNotifications(
    id, //This is the ID of the email notification object itself
    userId, //This is the ID of the user which wants the notification
    showid, //This is the ID of the show which the wants a notification for
    0
  );

  const emailNotificationDetails = await emailNotification.findOrCreate();

  res.send(emailNotification);
});

router.put("/api/reminders/:id", async (req, res) => {
  //console.log(req.body);
  const longId = req.params.id;
  //console.log(longId);
  const userId = longId.toString().slice(0, 8);
  //console.log(req.body.preference);

  if (req.body.preference == "ON") {
    Users.updatePreference(userId, 1);
  } else {
    Users.updatePreference(userId, 0);
  }
  /*const preference = req.body.preference;
  Users.updatePreference(userId, preference);*/
});

//Used for calculating when the reminder should be sent
function subtract15Minutes(time) {
  let [hours, minutes] = time.toString().split(":").map(Number);
  let totalMinutes = hours * 60 + minutes;
  totalMinutes -= 15;
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60; // Handle wraparound to previous day
  }
  hours = Math.floor(totalMinutes / 60);
  minutes = totalMinutes % 60;
  // Format the result as a string with leading zeros if necessary
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

module.exports = router;
