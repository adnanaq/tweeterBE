require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const initiateServer = require("./config/db");

const app = express();
initiateServer();

//PORT
const port = process.env.PORT || 3001;

// Middleware
const middleware = require("./middleware");

const loginRoute = require("./routes/loginRoutes");
const signupRoute = require("./routes/signupRoutes");

app.use(bodyParser.json());

// Routes
app.use("/login", loginRoute);
app.use("/signup", signupRoute);

app.get("/", middleware.checkLogin, (req, res, next) => {
  res.status(200).json({ message: "API working" });
});

app.listen(port, () =>
  console.log(`server is up and listening on port ${port}`)
);
