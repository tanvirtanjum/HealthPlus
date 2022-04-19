const db = require("../config/db.config");


exports.getRecords = (data, callback) => {
    db.query(
        `SELECT * FROM medications ORDER BY name; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getRecord = (data, callback) => {
    db.query(
        `SELECT * FROM medications WHERE id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postRecord = (data, callback) => {
    db.query(
        `INSERT INTO medications(code, name, brand, description, physician_id) VALUES (?, ?, ?, ?, ?);`,
        [data.code, data.name, data.brand, data.description, data.physician_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};

exports.updateRecord = (data, callback) => {
    db.query(
        `UPDATE medications SET code = ?, name = ?, brand = ?, description = ?, physician_id = ? WHERE id = ?;`,
        [data.code, data.name, data.brand, data.description, data.physician_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
