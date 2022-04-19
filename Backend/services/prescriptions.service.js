const db = require("../config/db.config");

exports.getAllRecords = (data, callback) => {
    db.query(
        `SELECT * FROM prescriptions WHERE id = ?`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getRecordByAppointment = (data, callback) => {
    db.query(
        `SELECT * FROM prescriptions WHERE appointment_id = ?`,
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
        `INSERT INTO prescriptions(patient_id, physician_id, appointment_id, examination) VALUES (?, ?, ?, ?);`,
        [data.patient_id, data.physician_id, data.appointment_id, data.examination],
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
        `UPDATE prescriptions SET examination = ? WHERE id = ?;`,
        [data.examination, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
