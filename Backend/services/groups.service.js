const db = require("../config/db.config");

exports.getAllGroups = (data, callback) => {
    db.query(
        `SELECT * FROM groups ORDER BY id ASC;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
