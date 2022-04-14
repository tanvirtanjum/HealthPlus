// <-- Importing System Library Modules -->
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// <-- IMPORTING ROUTES -->
const login_statusRoutes = require("./routes/login_status.route");
const loginsRoutes = require("./routes/logins.route");


// <---> 
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(cors());

// <-- ROUTES -->
app.use("/api/login_status", login_statusRoutes);
app.use("/api/logins", loginsRoutes);


// <-- -->
app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: "+process.env.SERVER_PORT_NO);
});