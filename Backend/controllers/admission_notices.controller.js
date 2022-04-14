// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const admission_noticeService = require("../services/admission_notice.service");

exports.getAllNotices = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        admission_noticeService.getAllNotices(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getNotice = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        admission_noticeService.getNotice(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.postNotice = (req, res, next) => {
    var validated = true;
    const data = {
        'title' : req.body.title,
        'details' : req.body.details,
        'dead_line' : req.body.dead_line,
    };

    if(validator.isEmpty(data.title , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.details , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isDate(data.dead_line, {format: 'MM/DD/YYYY'})) {
        validated = false;
    }

    if(validated){
        admission_noticeService.postNotice(data, (error, results) => {
            if (error) {
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(201).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.deleteNotice = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validated){
        admission_noticeService.deleteNotice(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(204).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updateNotice = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'title' : req.body.title,
        'details' : req.body.details,
        'dead_line' : req.body.dead_line,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.title , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.details , {ignore_whitespace: true})) {
        validated = false;
    }
    
    if(validator.isDate(data.dead_line, {format: 'MM/DD/YYYY'})) {
        validated = false;
    }

    if(validated){
        admission_noticeService.updateNotice(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(200).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};