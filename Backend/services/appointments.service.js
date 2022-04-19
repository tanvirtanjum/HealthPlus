const db = require("../config/db.config");

exports.getAllRecords = (data, callback) => {
    db.query(
        `SELECT appointments.*, physicians.name as phy_name, patients.name as pat_name, employees.name as emp_name FROM appointments `+ 
        `INNER JOIN physicians ON appointments.physician_id = physicians.id `+
        `INNER JOIN patients ON appointments.patient_id = patients.id `+
        `INNER JOIN employees ON appointments.employee_id = employees.id `+
        `ORDER BY appointments.date_for  ASC; `,
        [],
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
        `SELECT appointments.*, physicians.name as phy_name, patients.name as pat_name, employees.name as emp_name FROM appointments `+ 
        `INNER JOIN physicians ON appointments.physician_id = physicians.id `+
        `INNER JOIN patients ON appointments.patient_id = patients.id `+
        `INNER JOIN employees ON appointments.employee_id = employees.id `+
        `WHERE appointments.id = ?`,
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
        `INSERT INTO appointments(patient_id, physician_id, employee_id, date_for, times) VALUES (?, ?, ?, ?, ?);`,
        [data.patient_id, data.physician_id, data.employee_id, data.date_for, data.times],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};

exports.deleteRecord = (data, callback) => {
    db.query(
        `DELETE FROM appointments WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
