const db = require("../config/db.config");

exports.getAllStatus = (data, callback) => {
    db.query(
        `SELECT * FROM student_status ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};