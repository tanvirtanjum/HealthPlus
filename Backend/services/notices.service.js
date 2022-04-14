const db = require("../config/db.config");

exports.getAllNotices = (data, callback) => {
    db.query(
        `SELECT * FROM notices ORDER BY updated_at DESC;`,
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
        `SELECT * FROM notices WHERE id = ?;`,
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
        `INSERT INTO notices(subject, content) VALUES (?, ?);`,
        [data.subject, data.content],
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
        `DELETE FROM notices WHERE id = ?;`,
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
        `UPDATE notices SET subject = ?, content = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.subject, data.content, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};