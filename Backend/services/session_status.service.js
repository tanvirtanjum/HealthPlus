const db = require("../config/db.config");

exports.getAllStatus = (data, callback) => {
    db.query(
        `SELECT * FROM session_status ORDER BY status_name ASC;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
