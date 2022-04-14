const db = require("../config/db.config");

exports.getUser = (data, callback) => {
    db.query(
        `SELECT * FROM logins WHERE email = ? AND password = BINARY ?;`,
        [data.email, data.password],
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
        `INSERT INTO logins(email, password, role_id, access_id) VALUES (?, ?, ?, ?);`,
        [data.email, data.password, data.role_id, data.access_id],
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
        `SELECT email FROM logins WHERE email LIKE ?;`,
        [data.email],
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
        `SELECT id, email, role_id, access_id FROM logins WHERE id = ?;`,
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
        `UPDATE logins SET email = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.email, data.id],
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
        `UPDATE logins SET role_id = ?, access_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.role_id, data.access_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};


exports.sendUserPassword = (data, callback) => {
    db.query(
        `SELECT logins.*, access.access_name FROM logins INNER JOIN access ON logins.access_id = access.id WHERE logins.id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};