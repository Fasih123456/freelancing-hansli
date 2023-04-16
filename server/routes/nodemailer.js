//This class will handle all routes related to the nodemailer library
const nodemailer = require("nodemailer");
const express = require("express");
const router = require("express").Router();
const Mailgen = require("mailgen"); //Will be used to set the template for the email
const db = require("../util/sql");
const cron = require("node-cron");
require("dotenv").config();

cron.schedule("*/15 * * * *", async () => {
  // Your email reminder script code goes here
  // This code will run every 15 minutes

  const result = await db.execute(
    "SELECT u.email, s.name AS show_name, s.start_time AS show_start_time FROM users AS u INNER JOIN user_shows AS us ON u.id = us.user_id INNER JOIN shows s ON us.show_id = s.id WHERE s.start_time BETWEEN NOW() AND NOW() + INTERVAL 15 MINUTE",
    [req.body.id]
  );

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config);

  let MainGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "My Awesome Product",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name,
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      outro: "Thank for choose TV2NITE for your TV show needs.",
    },
  };

  let mail = MainGenerator.generate(response);

  // send mail with defined transport object
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Show Notifications ", // Subject line
    html: mail,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error sending email: ", err);
    } else {
      console.log("Email sent successfully: ", info);
    }
  });
});

module.exports = router;
