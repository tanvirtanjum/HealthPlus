const db = require("../config/db.config");

exports.getAllWings = (data, callback) => {
    db.query(
        `SELECT * FROM wings ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};