const db = require("../config/db.config");

exports.getAllPhysicians = (data, callback) => {
    db.query(
        `SELECT physicians.*, logins.username, login_status.status_name FROM physicians `+ 
        `INNER JOIN logins ON physicians.login_id = logins.id `+
        `INNER JOIN login_status ON logins.status_id = login_status.id `+
        `ORDER BY physicians.department  ASC; `,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getPhysician = (data, callback) => {
    db.query(
        `SELECT physicians.*, logins.username, login_status.status_name FROM physicians `+ 
        `INNER JOIN logins ON physicians.login_id = logins.id `+
        `INNER JOIN login_status ON logins.status_id = login_status.id `+
        `WHERE physicians.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getPhysicianByLogin = (data, callback) => {
    db.query(
        `SELECT physicians.*, logins.username, login_status.status_name FROM physicians `+ 
        `INNER JOIN logins ON physicians.login_id = logins.id `+
        `INNER JOIN login_status ON logins.status_id = login_status.id `+
        `WHERE physicians.login_id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getPhysiciansByNameOrEssn = (data, callback) => {
    db.query(
        `SELECT physicians.*, logins.username, login_status.status_name FROM physicians `+ 
        `INNER JOIN logins ON physicians.login_id = logins.id `+
        `INNER JOIN login_status ON logins.status_id = login_status.id `+
        `WHERE physicians.name LIKE ? OR physicians.pssn LIKE ?; `,
        [data.param1, data.param2],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postPhysician = (data, callback) => {
    db.query(
        `INSERT INTO physicians(pssn, name, phone_no, address, internship, department, login_id, employee_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.pssn, data.name, data.phone_no, data.address, data.internship, data.department, data.login_id, data.employee_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};

exports.updatePhysician = (data, callback) => {
    db.query(
        `UPDATE physicians SET name = ?, phone_no = ?, address = ?, internship = ?, department = ?, employee_id = ? WHERE id = ?;`,
        [data.name, data.phone_no, data.address, data.internship, data.department, data.employee_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
