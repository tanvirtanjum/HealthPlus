const db = require("../config/db.config");

exports.getAllSubjects = (data, callback) => {
    db.query(
        `SELECT subjects.*, groups.group_name FROM subjects `+
        `INNER JOIN groups ON subjects.group_id = groups.id `+
        `ORDER BY subject_name ASC;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getSubject = (data, callback) => {
    db.query(
        `SELECT subjects.*, groups.group_name FROM subjects `+
        `INNER JOIN groups ON subjects.group_id = groups.id `+
        `WHERE subjects.id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllSubjectsByName = (data, callback) => {
    db.query(
        `SELECT subjects.*, groups.group_name FROM subjects `+
        `INNER JOIN groups ON subjects.group_id = groups.id `+
        `WHERE subjects.subject_name LIKE ? `+
        `ORDER BY subject_name ASC;`,
        [data.subject_name],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postSubject = (data, callback) => {
    db.query(
        `INSERT INTO subjects(subject_code, subject_name, group_id) VALUES (?, ?, ?);`,
        [data.subject_code, data.subject_name, data.group_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateSubject = (data, callback) => {
    db.query(
        `UPDATE subjects SET subject_code = ?, subject_name = ?, group_id = ? WHERE id = ?;`,
        [data.subject_code, data.subject_name, data.group_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};