const db = require("../config/db.config");

exports.getAllEmployees = (data, callback) => {
    db.query(
        `SELECT employees.*, logins.username, admin_status.status_name FROM employees `+ 
        `INNER JOIN logins ON employees.login_id = logins.id `+
        `INNER JOIN admin_status ON employees.admin_status_id = admin_status.id `+
        `ORDER BY employees.department  ASC; `,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};


exports.getEmployee = (data, callback) => {
    db.query(
        `SELECT employees.*, logins.username, admin_status.status_name FROM employees `+ 
        `INNER JOIN logins ON employees.login_id = logins.id `+
        `INNER JOIN admin_status ON employees.admin_status_id = admin_status.id `+
        `WHERE employees.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getEmployeeByLogin = (data, callback) => {
    db.query(
        `SELECT employees.*, logins.username, admin_status.status_name FROM employees `+ 
        `INNER JOIN logins ON employees.login_id = logins.id `+
        `INNER JOIN admin_status ON employees.admin_status_id = admin_status.id `+
        `WHERE employees.login_id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getEmployeeByNameOrEssn = (data, callback) => {
    db.query(
        `SELECT employees.*, logins.username, admin_status.status_name FROM employees `+ 
        `INNER JOIN logins ON employees.login_id = logins.id `+
        `INNER JOIN admin_status ON employees.admin_status_id = admin_status.id `+
        `WHERE employees.name LIKE ? OR employees.essn LIKE ?; `,
        [data.param1, data.param2],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postEmployee = (data, callback) => {
    db.query(
        `INSERT INTO employees(essn, name, phone_no, address, salary, department, login_id, admin_status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.essn, data.name, data.phone_no, data.address, data.salary, data.department, data.login_id, data.admin_status_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};

exports.updateEmployee = (data, callback) => {
    db.query(
        `UPDATE employees SET name = ?, phone_no = ?, address = ?, salary = ?, department = ? WHERE id = ?;`,
        [data.name, data.phone_no, data.address, data.salary, data.department, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateUserRole = (data, callback) => {
    db.query(
        `UPDATE employees SET admin_status_id = ? WHERE login_id = ?;`,
        [data.status_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};