// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const subjectsService = require("../services/subjects.service");

exports.getAllSubjects = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        subjectsService.getAllSubjects(data, (error, results) => {
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

exports.getSubject = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        subjectsService.getSubject(data, (error, results) => {
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

exports.getAllSubjectsByName = (req, res, next) => {
    var validated = true;
    const data = {
        'subject_name' : "%"+req.params.name+"%",
    };

    if(validated){
        subjectsService.getAllSubjectsByName(data, (error, results) => {
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

exports.postSubject = (req, res, next) => {
    var validated = true;
    const data = {
        'subject_code' : req.body.subject_code,
        'subject_name' : req.body.subject_name,
        'group_id' : req.body.group_id,
    };

    if(validator.isEmpty(data.subject_code , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.subject_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        subjectsService.postSubject(data, (error, results) => {
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

exports.updateSubject = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'subject_code' : req.body.subject_code,
        'subject_name' : req.body.subject_name,
        'group_id' : req.body.group_id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.subject_code , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.subject_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        subjectsService.updateSubject(data, (error, results) => {
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