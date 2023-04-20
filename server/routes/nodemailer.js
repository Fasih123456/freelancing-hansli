//This class will handle all routes related to the nodemailer library
const nodemailer = require("nodemailer");
const express = require("express");
const router = require("express").Router();
const Mailgen = require("mailgen"); //Will be used to set the template for the email
const db = require("../util/sql");
const cron = require("node-cron");
require("dotenv").config();

cron.schedule("*/15 * * * *", async () => {
  try {
    const result = await db.execute(`
      SELECT * FROM users WHERE id IN (
      SELECT user_id FROM user_shows WHERE show_id IN(
      SELECT id
      FROM shows
      WHERE start_time > DATE_FORMAT(NOW(), '%H:%i:%s')
      AND start_time < DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 15 MINUTE), '%H:%i:%s')
      )
      )
    `);

    // Loop through each user in the result response
    for (const user of result) {
      const { id, name, email, wantsEmail } = user; // Extract user properties

      // Check if the user wants to receive email notifications
      if (wantsEmail) {
        // Create test account for nodemailer (you can replace this with your actual email transport config)
        let testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(config);

        // Create Mailgen generator with desired theme and product details
        let MainGenerator = new Mailgen({
          theme: "default",
          product: {
            name: "My Awesome Product",
            link: "https://mailgen.js/",
          },
        });

        // Define email response body with user-specific details
        let response = {
          body: {
            name,
            intro: `Hi ${name},\n\nWelcome to TV2NITE! We're thrilled to have you on board.`,
            outro: `Thank you for choosing TV2NITE for your TV show needs.\n\nBest regards,\nThe TV2NITE Team`,
          },
        };

        // Generate email using Mailgen
        let mail = MainGenerator.generate(response);

        // Define email message
        let message = {
          from: '"TV2NITE" <noreply@tv2nite.com>', // sender address
          to: email, // recipient email
          subject: `Your Show is going to start soon`, // Subject line
          html: mail,
        };

        // Send email with defined transport object
        let info = await transporter.sendMail(message);

        //console.log(`Email sent successfully to user with ID ${id}: `, info);
      }
    }
  } catch (error) {
    console.log("Error sending email: ", error);
  }
});

module.exports = router;
