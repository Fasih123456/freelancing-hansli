//This class will handle all routes related to the nodemailer library
const nodemailer = require("nodemailer");
const express = require("express");
const router = require("express").Router();
const Mailgen = require("mailgen"); //Will be used to set the template for the email
const db = require("../util/sql");
const cron = require("node-cron");
require("dotenv").config();

cron.schedule("15 * * * *", async () => {
  console.log("at send route");

  try {
    const result = await db.execute(`
  SELECT *
  FROM users
  WHERE id IN (
    SELECT user_id
    FROM user_shows
    WHERE show_id IN (
      SELECT id
      FROM shows
      WHERE CURTIME() BETWEEN STR_TO_DATE(start_time, '%H:%i:%s') AND STR_TO_DATE(end_time, '%H:%i:%s')
    )
  )
`);

    console.log(result[0]);

    // Loop through each user in the result response
    for (const user of result[0]) {
      const { id, name, email, wantsEmail } = user; // Extract user properties

      console.log("user: ", user);

      // Check if the user wants to receive email notifications
      if (wantsEmail) {
        // Create test account for nodemailer (you can replace this with your actual email transport config)
        //let testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "fasihislam1999@gmail.com",
            pass: "bdyqdvgzbwvzjrqu",
          },
        });

        let details = {
          from: "fasihislam1999@gmail.com",
          to: email,
          subject: `Hi ${name}! Your show is starting soon!`,
          text: "Your show is starting soon!",
        };

        transporter.sendMail(details, (err, data) => {
          if (err) {
            console.log("Error: ", err);
          } else {
            console.log("Email sent!");
          }
        });
      }
    }
  } catch (error) {
    console.log("Error sending email: ", error);
  }
});

router.get("/send", async (req, res) => {
  console.log("at send route");

  try {
    const result = await db.execute(`
  SELECT *
  FROM users
  WHERE id IN (
    SELECT user_id
    FROM user_shows
    WHERE show_id IN (
      SELECT id
      FROM shows
      WHERE CURTIME() BETWEEN STR_TO_DATE(start_time, '%H:%i:%s') AND STR_TO_DATE(end_time, '%H:%i:%s')
    )
  )
`);

    console.log(result[0]);

    // Loop through each user in the result response
    for (const user of result[0]) {
      const { id, name, email, wantsEmail } = user; // Extract user properties

      console.log("user: ", user);

      // Check if the user wants to receive email notifications
      if (wantsEmail) {
        // Create test account for nodemailer (you can replace this with your actual email transport config)
        //let testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "fasihislam1999@gmail.com", //Replace this with your email
            pass: "bdyqdvgzbwvzjrqu", //replace this with your APP password
          },
        });

        let details = {
          from: "fasihislam1999@gmail.com", //replace this with your email
          to: email,
          subject: `Hi ${name}! Your show is starting soon!`, //you can customize this however you want
          text: "Your show is starting soon!", //There are a lot of advance customization you can perform, you can use the nodemailer documentation for that
        };

        transporter.sendMail(details, (err, data) => {
          if (err) {
            console.log("Error: ", err);
          } else {
            console.log("Email sent!");
          }
        });
      }
    }
  } catch (error) {
    console.log("Error sending email: ", error);
  }
});

module.exports = router;
