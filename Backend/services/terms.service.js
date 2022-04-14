const db = require("../config/db.config");

exports.getAllTerms = (data, callback) => {
    db.query(
        `SELECT * FROM terms ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};