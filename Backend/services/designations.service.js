const db = require("../config/db.config");

exports.getAllDesignation = (data, callback) => {
    db.query(
        `SELECT * FROM designations ORDER BY designation_name ASC;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getDesignation = (data, callback) => {
    db.query(
        `SELECT * FROM designations WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postDesignation = (data, callback) => {
    db.query(
        `INSERT INTO designations(designation_name) VALUES (?);`,
        [data.designation_name],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.updateDesignation = (data, callback) => {
    db.query(
        `UPDATE designations SET designation_name = ? WHERE id = ?;`,
        [data.designation_name, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};