const db = require("../config/db.config");

exports.getAllFilesBySection = (data, callback) => {
    db.query(
        `SELECT * FROM section_files WHERE section_id = ? ORDER BY id;`,
        [data.section_id],
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
        `SELECT * FROM section_files WHERE id = ? ORDER BY id;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postSectionFile = (data, callback) => {
    db.query(
        `INSERT INTO section_files(file_name, file_path, section_id) VALUES (?, ?, ?);`,
        [data.file_name, data.file_path, data.section_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.deleteFileByID = (data, callback) => {
    db.query(
        `DELETE FROM section_files WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};