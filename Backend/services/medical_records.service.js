const db = require("../config/db.config");

exports.getRecord = (data, callback) => {
    db.query(
        `SELECT * FROM medical_records WHERE patient_id = ?; `,
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
        `INSERT INTO medical_records(sex, patient_id, disability_status, diabetes_status, blood_pressure_status, allergies_status) VALUES (?, ?, ?, ?, ?, ?);`,
        [data.sex, data.patient_id, data.disability_status, data.diabetes_status, data.blood_pressure_status, data.allergies_status],
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
        `UPDATE medical_records SET sex = ?, disability_status = ?, diabetes_status = ?, blood_pressure_status = ?, allergies_status = ? WHERE id = ?;`,
        [data.sex, data.disability_status, data.diabetes_status, data.blood_pressure_status, data.allergies_status, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
