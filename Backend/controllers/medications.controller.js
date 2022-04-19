// Importing System Library Modules
const validator = require('validator');

const medicationsService = require("../services/medications.service");

exports.getRecords= (req, res, next) => {
    var validated = true;
    const data = {
        
    };

    if(validated){
        medicationsService.getRecords(data, (error, results) => {
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

exports.getRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        medicationsService.getRecord(data, (error, results) => {
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


exports.postRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'code' : req.body.code,
        'physician_id' : req.body.physician_id,
        'name' : req.body.name,
        'brand' : req.body.brand,
        'description' : req.body.description,
    };

    if(validator.isEmpty(data.code , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        medicationsService.postRecord(data, (error, results) => {
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
        console.log("E 2");
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updateRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'code' : req.body.code,
        'physician_id' : req.body.physician_id,
        'name' : req.body.name,
        'brand' : req.body.brand,
        'description' : req.body.description,
    };

    if(data.id <= 0) {
        validated = false;
    }


    if(validated){
        medicationsService.updateRecord(data, (error, results) => {
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
