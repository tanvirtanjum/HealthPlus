// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const classesService = require("../services/classes.service");

exports.getAllClasses = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        classesService.getAllClasses(data, (error, results) => {
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


exports.getClass = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        classesService.getClass(data, (error, results) => {
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

exports.postClass = (req, res, next) => {
    var validated = true;
    const data = {
        'class_name' : req.body.class_name,
    };

    if(validator.isEmpty(data.class_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        classesService.postClass(data, (error, results) => {
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

exports.updateClass = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'class_name' : req.body.class_name,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.class_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        classesService.updateClass(data, (error, results) => {
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