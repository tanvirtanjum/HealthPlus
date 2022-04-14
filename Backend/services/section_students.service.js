const db = require("../config/db.config");


exports.getStudents = (data, callback) => {
    db.query(
        `SELECT section_students.*, students.name, students.student_id as roll, students.contact, students.father_name, students.mother_name FROM section_students `+
        `INNER JOIN students ON section_students.student_id = students.id `+
        `WHERE section_students.section_id = ?; `,
        [data.id],
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
        `INSERT INTO section_students(section_id, student_id) VALUES (?, ?);`,
        [data.section_id, data.student_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.deleteStudent = (data, callback) => {
    db.query(
        `DELETE FROM section_students WHERE section_id = ? AND student_id = ?;`,
        [data.section_id, data.student_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};