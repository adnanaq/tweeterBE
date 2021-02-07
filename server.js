require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const initiateServer = require("./config/db");

// IMPORT routes
const loginRoute = require("./routes/loginRoutes");
const signupRoute = require("./routes/signupRoutes");

// IMPORT API
const usersRoutes = require("./routes/api/users");
const chatsRoutes = require("./routes/api/chats");

const app = express();
app.use(morgan("tiny"));
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
app.use("/api/chats", middleware.checkLogin, chatsRoutes);

app.get("/", middleware.checkLogin, (req, res, next) => {
  res.status(200).json({ message: "API working" });
});

app.listen(port, () =>
  console.log(`server is up and listening on port ${port}`)
);

module.exports = app;
