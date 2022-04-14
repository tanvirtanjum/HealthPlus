// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const noticesService = require("../services/notices.service");

exports.getAllNotices = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        noticesService.getAllNotices(data, (error, results) => {
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
        noticesService.getNotice(data, (error, results) => {
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
        'subject' : req.body.subject,
        'content' : req.body.content,
    };

    if(validator.isEmpty(data.subject , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.content , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        noticesService.postNotice(data, (error, results) => {
            if (error) {
                console.log(error);
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
        noticesService.deleteNotice(data, (error, results) => {
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
        'subject' : req.body.subject,
        'content' : req.body.content,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.subject , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.content , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        noticesService.updateNotice(data, (error, results) => {
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