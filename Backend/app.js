// <-- Importing System Library Modules -->
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// <-- IMPORTING ROUTES -->
const login_statusRoutes = require("./routes/login_status.route");
const admin_statusRoutes = require("./routes/admin_status.route");
const loginsRoutes = require("./routes/logins.route");
const employeesRoutes = require("./routes/employees.route");
const physiciansRoutes = require("./routes/physicians.route");
const patientsRoutes = require("./routes/patients.route");

// <---> 
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(cors());

// <-- ROUTES -->
app.use("/api/login_status", login_statusRoutes);
app.use("/api/admin_status", admin_statusRoutes);
app.use("/api/logins", loginsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/physicians", physiciansRoutes);
app.use("/api/physicians", patientsRoutes);

// <-- -->
app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: "+process.env.SERVER_PORT_NO);
});