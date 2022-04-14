const db = require("../config/db.config");

exports.getAllTeachers = (data, callback) => {
    db.query(
        `SELECT teachers.*, logins.email, logins.role_id, roles.role_name, subjects.subject_name, employment_status.status_name FROM teachers `+ 
        `INNER JOIN logins ON teachers.login_id = logins.id `+
        `INNER JOIN roles ON logins.role_id = roles.id `+
        `INNER JOIN subjects ON teachers.subject_id = subjects.id `+
        `INNER JOIN employment_status ON teachers.employment_status_id = employment_status.id `+
        `ORDER BY teachers.subject_id ASC; `,
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
        FROM teachers `,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getTeacher = (data, callback) => {
    db.query(
        `SELECT teachers.*, logins.email, logins.role_id, logins.access_id, roles.role_name, subjects.subject_name, employment_status.status_name FROM teachers `+ 
        `INNER JOIN logins ON teachers.login_id = logins.id `+
        `INNER JOIN roles ON logins.role_id = roles.id `+
        `INNER JOIN subjects ON teachers.subject_id = subjects.id `+
        `INNER JOIN employment_status ON teachers.employment_status_id = employment_status.id `+
        `WHERE teachers.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getTeacherByLogin = (data, callback) => {
    db.query(
        `SELECT teachers.*, logins.email, logins.role_id, logins.access_id, roles.role_name, subjects.subject_name, employment_status.status_name FROM teachers `+ 
        `INNER JOIN logins ON teachers.login_id = logins.id `+
        `INNER JOIN roles ON logins.role_id = roles.id `+
        `INNER JOIN subjects ON teachers.subject_id = subjects.id `+
        `INNER JOIN employment_status ON teachers.employment_status_id = employment_status.id `+
        `WHERE teachers.login_id = ?; `,
        [data.login_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getTeachersByName = (data, callback) => {
    db.query(
        `SELECT teachers.*, logins.email, logins.role_id, roles.role_name, subjects.subject_name, employment_status.status_name FROM teachers `+ 
        `INNER JOIN logins ON teachers.login_id = logins.id `+
        `INNER JOIN roles ON logins.role_id = roles.id `+
        `INNER JOIN subjects ON teachers.subject_id = subjects.id `+
        `INNER JOIN employment_status ON teachers.employment_status_id = employment_status.id `+
        `WHERE teachers.name LIKE ?; `,
        [data.name],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postTeacher = (data, callback) => {
    db.query(
        `INSERT INTO teachers(name, father_name, mother_name, contact, sex, bg, religion, present_address, permanent_address, salary, subject_id, img_path, file_no, login_id, employment_status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.name, data.father_name, data.mother_name, data.contact, data.sex, data.bg, data.religion, data.present_address, data.permanent_address, data.salary, data.subject_id, data.img_path, data.file_no, data.login_id, data.employment_status_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};

exports.updateTeacher = (data, callback) => {
    db.query(
        `UPDATE teachers SET name = ?, father_name = ?, mother_name = ?, contact = ?, sex = ?, bg = ?, religion = ?, present_address = ?, permanent_address = ?, salary = ?, subject_id = ?, file_no = ?, employment_status_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.name, data.father_name, data.mother_name, data.contact, data.sex, data.bg, data. religion, data.present_address, data.permanent_address, data.salary, data.subject_id, data.file_no, data.employment_status_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateTeacherImage = (data, callback) => {
    db.query(
        `UPDATE teachers SET img_path = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.img_path, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getContact = (data, callback) => {
    db.query(
        `SELECT contact FROM teachers WHERE contact LIKE ?;`,
        [data.contact],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.getFileNo = (data, callback) => {
    db.query(
        `SELECT file_no FROM teachers WHERE file_no LIKE ?;`,
        [data.file_no],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};