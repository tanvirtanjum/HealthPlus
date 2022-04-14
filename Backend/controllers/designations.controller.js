// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const designationsService = require("../services/designations.service");

exports.getAllDesignation = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        designationsService.getAllDesignation(data, (error, results) => {
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

exports.getDesignation = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        designationsService.getDesignation(data, (error, results) => {
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

exports.postDesignation = (req, res, next) => {
    var validated = true;
    const data = {
        'designation_name' : req.body.designation_name,
    };

    if(validator.isEmpty(data.designation_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        designationsService.postDesignation(data, (error, results) => {
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
        designationsService.deleteNotice(data, (error, results) => {
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

exports.updateDesignation = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'designation_name' : req.body.designation_name,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.designation_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        designationsService.updateDesignation(data, (error, results) => {
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