const db = require("../config/db.config");

exports.getAllRecords = (data, callback) => {
    db.query(
        `SELECT medicines_list.*, medications.name, medications.code FROM medicines_list `+ 
        `INNER JOIN medications ON medicines_list.medication_id = medications.id `+
        `WHERE medicines_list.prescription_id = ?; `,
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

exports.getRecordByPhysician = (data, callback) => {
    db.query(
        `SELECT appointments.*, physicians.name as phy_name, patients.name as pat_name, employees.name as emp_name FROM appointments `+ 
        `INNER JOIN physicians ON appointments.physician_id = physicians.id `+
        `INNER JOIN patients ON appointments.patient_id = patients.id `+
        `INNER JOIN employees ON appointments.employee_id = employees.id `+
        `WHERE appointments.physician_id = ?`,
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
        `INSERT INTO medicines_list(medication_id, prescription_id, dose) VALUES (?, ?, ?);`,
        [data.medication_id, data.prescription_id, data.dose],
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
        `DELETE FROM medicines_list WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
