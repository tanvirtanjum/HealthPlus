const db = require("../config/db.config");

exports.getUser = (data, callback) => {
    db.query(
        `SELECT * FROM logins WHERE username = ? AND password = BINARY ?;`,
        [data.username, data.password],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.getUserPassword = (data, callback) => {
    db.query(
        `SELECT logins.*, access.access_name FROM logins INNER JOIN access ON logins.access_id = access.id WHERE logins.email = ?;`,
        [data.email],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.updateUserPassword = (data, callback) => {
    db.query(
        `UPDATE logins SET password = ?, updated_at = current_timestamp WHERE id = ?; SELECT * FROM logins WHERE id = ?;`,
        [data.password, data.id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.postUser = (data, callback) => {
    db.query(
        `INSERT INTO logins(username, password, status_id) VALUES (?, ?, ?);`,
        [data.username, data.password, data.status_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getEmail = (data, callback) => {
    db.query(
        `SELECT username FROM logins WHERE username LIKE ?;`,
        [data.username],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.getLogin = (data, callback) => {
    db.query(
        `SELECT id, username, status_id FROM logins WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.updateUserEmail = (data, callback) => {
    db.query(
        `UPDATE logins SET username = ? WHERE id = ?;`,
        [data.username, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.updateUserRole = (data, callback) => {
    db.query(
        `UPDATE logins SET status_id = ? WHERE id = ?;`,
        [data.status_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};
