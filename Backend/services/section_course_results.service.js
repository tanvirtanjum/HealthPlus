const db = require("../config/db.config");


exports.getResult = (data, callback) => {
    db.query(
        `SELECT section_course_results.*, section_courses.subject_id, subjects.subject_name, students.name, students.student_id as roll, terms.term_name, remarks.remark_name FROM section_course_results `+
        `INNER JOIN section_courses ON section_course_results.section_course_id = section_courses.id `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN students ON section_course_results.student_id = students.id `+
        `INNER JOIN terms ON section_course_results.term_id = terms.id `+
        `INNER JOIN remarks ON section_course_results.remark_id = remarks.id `+
        `WHERE section_course_results.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getResultsBySectionCourse = (data, callback) => {
    db.query(
        `SELECT section_course_results.*, section_courses.subject_id, subjects.subject_name, students.name, students.student_id as roll, terms.term_name, remarks.remark_name FROM section_course_results `+
        `INNER JOIN section_courses ON section_course_results.section_course_id = section_courses.id `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN students ON section_course_results.student_id = students.id `+
        `INNER JOIN terms ON section_course_results.term_id = terms.id `+
        `INNER JOIN remarks ON section_course_results.remark_id = remarks.id `+
        `WHERE section_course_results.section_course_id = ? AND section_course_results.term_id = ? AND section_course_results.section_id = ?; `,
        [data.section_course_id, data.term_id, data.section_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getVerification = (data, callback) => {
    db.query(
        `SELECT * FROM section_course_results WHERE section_course_id = ? AND term_id = ? AND student_id = ? AND section_id = ?;`,
        [data.section_course_id, data.term_id, data.student_id, data.section_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getStudentResult = (data, callback) => {
    db.query(
        `SELECT section_course_results.*, section_courses.subject_id, subjects.subject_name, students.name, students.student_id as roll, terms.term_name, remarks.remark_name FROM section_course_results `+
        `INNER JOIN section_courses ON section_course_results.section_course_id = section_courses.id `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN students ON section_course_results.student_id = students.id `+
        `INNER JOIN terms ON section_course_results.term_id = terms.id `+
        `INNER JOIN remarks ON section_course_results.remark_id = remarks.id `+
        `WHERE section_course_results.student_id = ? AND section_course_results.session_id = ? ORDER BY section_course_results.term_id; `,
        [data.student_id, data.session_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getStudentResultTerm = (data, callback) => {
    db.query(
        `SELECT section_course_results.*, section_courses.subject_id, subjects.subject_name, students.name, students.student_id as roll, terms.term_name, remarks.remark_name FROM section_course_results `+
        `INNER JOIN section_courses ON section_course_results.section_course_id = section_courses.id `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN students ON section_course_results.student_id = students.id `+
        `INNER JOIN terms ON section_course_results.term_id = terms.id `+
        `INNER JOIN remarks ON section_course_results.remark_id = remarks.id `+
        `WHERE section_course_results.student_id = ? AND section_course_results.session_id = ? AND section_course_results.term_id = ? ORDER BY section_course_results.remark_id; `,
        [data.student_id, data.session_id, data.term_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postResult = (data, callback) => {
    db.query(
        `INSERT INTO section_course_results(student_id, ct1, ct2, termfinal, session_id, section_id, section_course_id, term_id, remark_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.student_id, data.ct1, data.ct2, data.termfinal, data.session_id, data.section_id, data.section_course_id, data.term_id, data.remark_id,],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateResult = (data, callback) => {
    db.query(
        `UPDATE section_course_results SET ct1 = ?, ct2 = ?, termfinal = ?, term_id = ?, remark_id = ?, updated_at = current_timestamp WHERE id = ? AND section_course_id = ?;`,
        [data.ct1, data.ct2, data.termfinal, data.term_id, data.remark_id, data.id, data.section_course_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
