// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const academic_sessionsService = require("../services/academic_sessions.service");

exports.getAllSessions = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        academic_sessionsService.getAllSessions(data, (error, results) => {
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

exports.getAllSessionsByName = (req, res, next) => {
    var validated = true;
    const data = {
        'year_name' : "%"+req.params.name+"%",
    };

    if(validated){
        academic_sessionsService.getAllSessionsByName(data, (error, results) => {
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

exports.getSession = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        academic_sessionsService.getSession(data, (error, results) => {
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

exports.postSession = (req, res, next) => {
    var validated = true;
    const data = {
        'year_name' : req.body.year_name,
        'session_status_id' : req.body.session_status_id,
    };

    if(validator.isEmpty(data.year_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        academic_sessionsService.postSession(data, (error, results) => {
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

exports.updateSession = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'year_name' : req.body.year_name,
        'session_status_id' : req.body.session_status_id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.year_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        academic_sessionsService.updateSession(data, (error, results) => {
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