const db = require("../config/db.config");

exports.getAllStudent = (data, callback) => {
    db.query(
        `SELECT students.*, logins.email, classes.class_name, groups.group_name, wings.wing_name, student_status.status_name FROM students `+ 
        `INNER JOIN logins ON students.login_id = logins.id `+
        `INNER JOIN classes ON students.cur_class_id = classes.id `+
        `INNER JOIN groups ON students.cur_group_id = groups.id `+
        `INNER JOIN wings ON students.wing_id = wings.id `+
        `INNER JOIN student_status ON students.studentship_id = student_status.id `+
        `ORDER BY students.student_id ASC;`,
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
            SUM(IF(studentship_id = 1, 1, 0)) AS active_stu,
            SUM(IF(studentship_id = 2, 1, 0)) AS ag_stu,
            SUM(IF(studentship_id = 3, 1, 0)) AS atn_stu,
            SUM(IF(studentship_id = 4, 1, 0)) AS atd_stu
        FROM students; `,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getStudent = (data, callback) => {
    db.query(
        `SELECT students.*, logins.email, classes.class_name, groups.group_name, wings.wing_name, student_status.status_name FROM students `+ 
        `INNER JOIN logins ON students.login_id = logins.id `+
        `INNER JOIN classes ON students.cur_class_id = classes.id `+
        `INNER JOIN groups ON students.cur_group_id = groups.id `+
        `INNER JOIN wings ON students.wing_id = wings.id `+
        `INNER JOIN student_status ON students.studentship_id = student_status.id `+
        `WHERE students.id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getStudentByLogin = (data, callback) => {
    db.query(
        `SELECT students.*, logins.email, classes.class_name, groups.group_name, wings.wing_name, student_status.status_name FROM students `+ 
        `INNER JOIN logins ON students.login_id = logins.id `+
        `INNER JOIN classes ON students.cur_class_id = classes.id `+
        `INNER JOIN groups ON students.cur_group_id = groups.id `+
        `INNER JOIN wings ON students.wing_id = wings.id `+
        `INNER JOIN student_status ON students.studentship_id = student_status.id `+
        `WHERE students.login_id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getStudentsByNameID = (data, callback) => {
    db.query(
        `SELECT students.*, logins.email, classes.class_name, groups.group_name, wings.wing_name, student_status.status_name FROM students `+ 
        `INNER JOIN logins ON students.login_id = logins.id `+
        `INNER JOIN classes ON students.cur_class_id = classes.id `+
        `INNER JOIN groups ON students.cur_group_id = groups.id `+
        `INNER JOIN wings ON students.wing_id = wings.id `+
        `INNER JOIN student_status ON students.studentship_id = student_status.id `+
        `WHERE students.name LIKE ? OR students.student_id LIKE ?; `,
        [data.para, data.para],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getStudentByStudentID = (data, callback) => {
    db.query(
        `SELECT student_id FROM students WHERE student_id LIKE ?; `,
        [data.student_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postStudent = (data, callback) => {
    db.query(
        `INSERT INTO students(name, student_id, admission_class_id, admission_group_id, father_name, mother_name, contact, sex, religion, present_address, permanent_address, cur_class_id, cur_group_id, studentship_id, login_id, wing_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.name, data.student_id, data.admission_class_id, data.admission_group_id, data.father_name, data.mother_name, data.contact, data.sex, data.religion, data.present_address, data.permanent_address, data.cur_class_id, data.cur_group_id, data.studentship_id, data.login_id, data.wing_id],
        (error, results, fields) => {
            if (error) {
                console.log(data);
                return callback(error);
            }

            console.log(data);
            return callback(null, results);
        }
    );
};


exports.updateStudent = (data, callback) => {
    db.query(
        `UPDATE students SET name = ?, student_id = ?, father_name = ?, mother_name = ?, contact = ?, sex = ?, admission_class_id = ?, admission_group_id = ?, religion = ?, present_address = ?, permanent_address = ?, cur_class_id = ?, cur_group_id = ?, wing_id = ?, studentship_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.name, data.student_id, data.father_name, data.mother_name, data.contact, data.sex, data.admission_class_id, data.admission_group_id, data. religion, data.present_address, data.permanent_address, data.cur_class_id, data.cur_group_id, data.wing_id, data.studentship_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateStudentClassGroup = (data, callback) => {
    db.query(
        `UPDATE students SET cur_class_id = ?, cur_group_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.cur_class_id, data.cur_group_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateStudentImage = (data, callback) => {
    db.query(
        `UPDATE students SET img_path = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.img_path, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};
