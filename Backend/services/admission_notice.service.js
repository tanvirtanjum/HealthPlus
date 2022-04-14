const db = require("../config/db.config");

exports.getAllNotices = (data, callback) => {
    db.query(
        `SELECT * FROM admission_notices ORDER BY updated_at DESC;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getNotice = (data, callback) => {
    db.query(
        `SELECT * FROM admission_notices WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postNotice = (data, callback) => {
    db.query(
        `INSERT INTO admission_notices(title, details, dead_line) VALUES (?, ?, ?);`,
        [data.title, data.details, data.dead_line],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.deleteNotice = (data, callback) => {
    db.query(
        `DELETE FROM admission_notices WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateNotice = (data, callback) => {
    db.query(
        `UPDATE admission_notices SET title = ?, details = ?, dead_line = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.title, data.details, data.dead_line, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};