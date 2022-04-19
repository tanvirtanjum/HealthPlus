const db = require("../config/db.config");

exports.getAllPatients = (data, callback) => {
    db.query(
        `SELECT patients.*, physicians.name as phy_name, insurance.insrurance_id as i_i, insurance.company_name, insurance.insurance_pay, insurance.copay, insurance.p_s FROM patients `+ 
        `INNER JOIN physicians ON patients.physician_id = physicians.id `+
        `INNER JOIN insurance ON patients.insurance_id = insurance.id `+
        `ORDER BY patients.name  ASC; `,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getCount = (data, callback) => {
    db.query(
        `SELECT
            SUM(IF(employment_status_id = 1, 1, 0)) AS active_emp,
            SUM(IF(employment_status_id = 2, 1, 0)) AS left_emp,
            SUM(IF(employment_status_id = 3, 1, 0)) AS on_break_emp,
            SUM(IF(employment_status_id = 4, 1, 0)) AS retired_emp
        FROM employees `,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getPatient = (data, callback) => {
    db.query(
        `SELECT patients.*, physicians.name as phy_name, insurance.insrurance_id as i_i, insurance.company_name, insurance.insurance_pay, insurance.copay, insurance.p_s FROM patients `+ 
        `INNER JOIN physicians ON patients.physician_id = physicians.id `+
        `INNER JOIN insurance ON patients.insurance_id = insurance.id `+
        `WHERE patients.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getPatientByNameOrSsn = (data, callback) => {
    db.query(
        `SELECT patients.*, physicians.name as phy_name, insurance.insrurance_id as i_i, insurance.company_name, insurance.insurance_pay, insurance.copay, insurance.p_s FROM patients `+ 
        `INNER JOIN physicians ON patients.physician_id = physicians.id `+
        `INNER JOIN insurance ON patients.insurance_id = insurance.id `+
        `WHERE patients.name LIKE ? OR patients.ssn LIKE ?; `,
        [data.param1, data.param2],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postPatient = (data, callback) => {
    db.query(
        `INSERT INTO patients(ssn, name, phone_no, address, dob, physician_id, insurance_id) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [data.ssn, data.name, data.phone_no, data.address, data.dob, data.physician_id, data.insurance_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};

exports.updatePatient = (data, callback) => {
    db.query(
        `UPDATE patients SET name = ?, phone_no = ?, address = ?, dob = ?, physician_id = ? WHERE id = ?;`,
        [data.name, data.phone_no, data.address, data.dob, data.physician_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
