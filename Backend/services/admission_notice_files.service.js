const db = require("../config/db.config");

exports.getAllFilesByNotice = (data, callback) => {
    db.query(
        `SELECT * FROM admission_notice_files WHERE admission_notice_id = ? ORDER BY id;`,
        [data.notice_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getFileByID = (data, callback) => {
    db.query(
        `SELECT * FROM admission_notice_files WHERE id = ? ORDER BY id;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postNoticeFile = (data, callback) => {
    db.query(
        `INSERT INTO admission_notice_files(file_name, file_path, admission_notice_id) VALUES (?, ?, ?);`,
        [data.file_name, data.file_path, data.notice_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.deleteNoticeFileByID = (data, callback) => {
    db.query(
        `DELETE FROM admission_notice_files WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};