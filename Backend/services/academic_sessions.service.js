const db = require("../config/db.config");

exports.getAllSessions = (data, callback) => {
    db.query(
        `SELECT academic_sessions.*, session_status.status_name FROM academic_sessions `+
        `INNER JOIN session_status ON academic_sessions.session_status_id = session_status.id `+
        `ORDER BY academic_sessions.year_name DESC`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllSessionsByName = (data, callback) => {
    db.query(
        `SELECT academic_sessions.*, session_status.status_name FROM academic_sessions `+
        `INNER JOIN session_status ON academic_sessions.session_status_id = session_status.id `+
        `WHERE academic_sessions.year_name Like ?; `,
        [data.year_name],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getSession = (data, callback) => {
    db.query(
        `SELECT academic_sessions.*, session_status.status_name FROM academic_sessions `+
        `INNER JOIN session_status ON academic_sessions.session_status_id = session_status.id `+
        `WHERE academic_sessions.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postSession = (data, callback) => {
    db.query(
        `INSERT INTO academic_sessions(year_name, session_status_id) VALUES (?, ?);`,
        [data.year_name, data.session_status_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateSession = (data, callback) => {
    db.query(
        `UPDATE academic_sessions SET year_name = ?, session_status_id = ? WHERE id = ?;`,
        [data.year_name, data.session_status_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};