// Importing System Library Modules
const validator = require('validator');

const medicines_listService = require("../services/medicines_list.service");

exports.getAllRecords = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        medicines_listService.getAllRecords(data, (error, results) => {
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


exports.postRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'medication_id' : req.body.medication_id,
        'prescription_id' : req.body.prescription_id ,
        'dose' : req.body.dose,
    };

    if(validator.isEmpty(data.dose , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        medicines_listService.postRecord(data, (error, results) => {
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

exports.deleteRecord = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    

    if(validated){
        medicines_listService.deleteRecord(data, (error, results) => {
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
