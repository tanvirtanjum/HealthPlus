// <-- Importing System Library Modules -->
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

// <-- IMPORTING ROUTES -->
const downloadRoutes = require("./routes/download.route");
const rolesRoutes = require("./routes/roles.route");
const loginsRoutes = require("./routes/logins.route");
const noticesRoutes = require("./routes/notices.route");
const notice_filesRoutes = require("./routes/notice_files.route");
const admission_noticesRoutes = require("./routes/admission_notices.route");
const admission_notice_filesRoutes = require("./routes/admission_notice_files.route");
const employeesRoutes = require("./routes/employees.route");
const designationsRoutes = require("./routes/designations.route");
const employment_statusRoutes = require("./routes/employment_status.route");
const teachersRoutes = require("./routes/teachers.route");
const subjectsRoutes = require("./routes/subjects.route");
const groupsRoutes = require("./routes/groups.route");
const classesRoutes = require("./routes/classes.route");
const wingsRoutes = require("./routes/wings.route");
const student_statusRoutes = require("./routes/student_status.route");
const studentsRoutes = require("./routes/students.route");
const session_statusRoutes = require("./routes/session_status.route");
const academic_sessionsRoutes = require("./routes/academic_sessions.route");
const academic_session_sectionsRoutes = require("./routes/academic_session_sections.route");
const section_coursesRoutes = require("./routes/section_courses.route");
const section_studentsRoutes = require("./routes/section_students.route");
const my_academic_sessionsRoutes = require("./routes/my_academic_sessions.route");
const section_filesRoutes = require("./routes/section_files.route");
const termsRoutes = require("./routes/terms.route");
const remarksRoutes = require("./routes/remarks.route");
const section_course_resultsRoutes = require("./routes/section_course_results.route");


// <---> 
dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(cors());

// <-- ROUTES -->
app.use('/api/download', downloadRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/logins", loginsRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/notice_files", notice_filesRoutes);
app.use("/api/admission_notices", admission_noticesRoutes);
app.use("/api/admission_notice_files", admission_notice_filesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/designations", designationsRoutes);
app.use("/api/employment_status", employment_statusRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/wings", wingsRoutes);
app.use("/api/student_status", student_statusRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/academic_sessions", academic_sessionsRoutes);
app.use("/api/session_status", session_statusRoutes);
app.use("/api/academic_session_sections", academic_session_sectionsRoutes);
app.use("/api/section_courses", section_coursesRoutes);
app.use("/api/section_students", section_studentsRoutes);
app.use("/api/my_academic_sessions", my_academic_sessionsRoutes);
app.use("/api/section_files", section_filesRoutes);
app.use("/api/terms", termsRoutes);
app.use("/api/remarks", remarksRoutes);
app.use("/api/section_course_results", section_course_resultsRoutes);

// <-- -->
app.listen(process.env.SERVER_PORT_NO, () => {
  console.log("Server Started at Port: "+process.env.SERVER_PORT_NO);
});