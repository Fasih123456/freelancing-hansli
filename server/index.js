const express = require("express");
const { connectAndQuery } = require("./util/sql"); // import the SQL connection

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const PORT = process.env.PORT || 3001;

const app = express();
const path = require("path");
const db = require("./util/sql");
const session = require("express-session");
const cors = require("cors");
const OAuthRoutes = require("./routes/OAuth");
const NotificationRoutes = require("./routes/Notification");
const nodemailerRoutes = require("./routes/nodemailer");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../website/build")));

app.use("/", OAuthRoutes);
app.use("/", NotificationRoutes);
app.use("/", nodemailerRoutes);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../website/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
