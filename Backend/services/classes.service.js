const db = require("../config/db.config");

exports.getAllClasses = (data, callback) => {
    db.query(
        `SELECT * FROM classes ORDER BY id ASC`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.getClass = (data, callback) => {
    db.query(
        `SELECT * FROM classes WHERE id = ?`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postClass = (data, callback) => {
    db.query(
        `INSERT INTO classes(class_name) VALUES (?);`,
        [data.class_name],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateClass = (data, callback) => {
    db.query(
        `UPDATE classes SET class_name = ? WHERE id = ?;`,
        [data.class_name, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};