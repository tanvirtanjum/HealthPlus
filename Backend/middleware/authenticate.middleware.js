// const db = require("../config/db.config");

exports.authLogin = (req, res, next) => {
    if (req.header("role") == null || req.header("role").trim().length <= 0) {
            return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }
    next();
};

exports.authAdmin = (req, res, next) => {
    if (req.header("role") != 1) {
            return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }
    next();
};

exports.authPhysician = (req, res, next) => {
    if (req.header("role") != 2) {
            return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }
    next();
};


exports.authAdmin_Physician = (req, res, next) => {
    if (req.header("role") == 1 || req.header("role") == 2) {
        next();
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }   
};
