const db = require("../config/db.config");

exports.getAllRemarks = (data, callback) => {
    db.query(
        `SELECT * FROM remarks ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};