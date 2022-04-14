const db = require("../config/db.config");

exports.getAllFilesByNotice = (data, callback) => {
    db.query(
        `SELECT * FROM notice_files WHERE notice_id = ? ORDER BY id;`,
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
        `SELECT * FROM notice_files WHERE id = ? ORDER BY id;`,
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
        `INSERT INTO notice_files(file_name, file_path, notice_id) VALUES (?, ?, ?);`,
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
        `DELETE FROM notice_files WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};