require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const initiateServer = require("./config/db");

// IMPORT routes
const loginRoute = require("./routes/loginRoutes");
const signupRoute = require("./routes/signupRoutes");

// IMPORT API
const usersRoutes = require("./routes/api/users");

const app = express();
app.use(bodyParser.json());

// Mongo server initialization
initiateServer();

//PORT
const port = process.env.PORT || 3001;

// MIDDLEWARE
const middleware = require("./middleware");

// Router Middleware
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/api/users", usersRoutes);

app.get("/", middleware.checkLogin, (req, res, next) => {
  res.status(200).json({ message: "API working" });
});

app.listen(port, () =>
  console.log(`server is up and listening on port ${port}`)
);

module.exports = app;
