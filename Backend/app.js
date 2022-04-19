// <-- Importing System Library Modules -->
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// <-- IMPORTING ROUTES -->
const login_statusRoutes = require("./routes/login_status.route");
const admin_statusRoutes = require("./routes/admin_status.route");
const illness_statusRoutes = require("./routes/illness_status.route");
const loginsRoutes = require("./routes/logins.route");
const employeesRoutes = require("./routes/employees.route");
const physiciansRoutes = require("./routes/physicians.route");
const insuranceRoutes = require("./routes/insurance.route");
const patientsRoutes = require("./routes/patients.route");
const medical_recordsRoutes = require("./routes/medical_records.route");
const appointmentsRoutes = require("./routes/appointments.route");
const medicationsRoutes = require("./routes/medications.route");
const prescriptionsRoutes = require("./routes/prescriptions.route");
const medicines_listRoutes = require("./routes/medicines_list.route");

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
app.use("/api/illness_status", illness_statusRoutes);
app.use("/api/logins", loginsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/physicians", physiciansRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/medical_records", medical_recordsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/medications", medicationsRoutes);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/medicines_list", medicines_listRoutes);

// <-- -->
app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: "+process.env.SERVER_PORT_NO);
});