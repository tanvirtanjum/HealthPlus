const db = require("../config/db.config");


exports.getCourse = (data, callback) => {
    db.query(
        `SELECT section_courses.*, subjects.subject_name, teachers.name FROM section_courses `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN teachers ON section_courses.teacher_id = teachers.id `+
        `WHERE section_courses.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getCoursesBySection = (data, callback) => {
    db.query(
        `SELECT section_courses.*, subjects.subject_name, teachers.name FROM section_courses `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN teachers ON section_courses.teacher_id = teachers.id `+
        `WHERE section_courses.section_id = ?; `,
        [data.section_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getCourseBySession_Teacher = (data, callback) => {
    db.query(
        `SELECT section_courses.*, subjects.subject_name, teachers.name, academic_session_sections.section_name, academic_session_sections.class_id, academic_session_sections.wing_id, academic_session_sections.group_id, classes.class_name, wings.wing_name, groups.group_name FROM section_courses `+
        `INNER JOIN subjects ON section_courses.subject_id = subjects.id `+
        `INNER JOIN teachers ON section_courses.teacher_id = teachers.id `+
        `INNER JOIN academic_session_sections ON section_courses.section_id = academic_session_sections.id `+
        `INNER JOIN classes ON academic_session_sections.class_id = classes.id `+
        `INNER JOIN wings ON academic_session_sections.wing_id = wings.id `+
        `INNER JOIN groups ON academic_session_sections.group_id = groups.id `+
        `WHERE section_courses.session_id = ? AND section_courses.teacher_id = ?; `,
        [data.session_id, data.teacher_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postCourse = (data, callback) => {
    db.query(
        `INSERT INTO section_courses(session_id, section_id, subject_id, class_timing, teacher_id) VALUES (?, ?, ?, ?, ?);`,
        [data.session_id, data.section_id, data.subject_id, data.class_timing, data.teacher_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateCourse = (data, callback) => {
    db.query(
        `UPDATE section_courses SET subject_id = ?, class_timing = ?, teacher_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.subject_id, data.class_timing, data.teacher_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.deleteCourse = (data, callback) => {
    db.query(
        `DELETE FROM section_courses WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};