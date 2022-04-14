const db = require("../config/db.config");


exports.getStudents = (data, callback) => {
    db.query(
        `SELECT * FROM my_academic_sessions WHERE student_id = ? AND academic_session_id = ?; `,
        [data.student_id, data.session_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getMyStudentSession = (data, callback) => {
    db.query(
        `SELECT my_academic_sessions.*, academic_sessions.year_name, academic_session_sections.class_id, classes.class_name FROM my_academic_sessions `+ 
        `INNER JOIN academic_sessions ON my_academic_sessions.academic_session_id = academic_sessions.id `+
        `INNER JOIN academic_session_sections ON my_academic_sessions.section_id = academic_session_sections.id `+
        `INNER JOIN classes ON academic_session_sections.class_id = classes.id `+
        `WHERE student_id = ?; `,
        [data.student_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postStudent = (data, callback) => {
    db.query(
        `INSERT INTO my_academic_sessions(academic_session_id, section_id, student_id) VALUES (?, ?, ?);`,
        [data.academic_session_id, data.section_id, data.student_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.deleteSession = (data, callback) => {
    db.query(
        `DELETE FROM my_academic_sessions WHERE academic_session_id = ? AND section_id = ? AND student_id = ?;`,
        [data.academic_session_id, data.section_id, data.student_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};