const db = require("../config/db.config");

exports.postInsurance = (data, callback) => {
    db.query(
        `INSERT INTO insurance(insrurance_id, company_name, insurance_pay, copay, p_s) VALUES (?, ?, ?, ?, ?);`,
        [data.insrurance_id, data.company_name, data.insurance_pay, data.copay, data.p_s],
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
        `UPDATE insurance SET insrurance_id = ?, company_name = ?, insurance_pay = ?, copay = ?, p_s = ? WHERE id = ?;`,
        [data.insrurance_id, data.company_name, data.insurance_pay, data.copay, data.p_s, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
