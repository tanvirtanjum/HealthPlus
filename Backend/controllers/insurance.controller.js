// Importing System Library Modules
const validator = require('validator');

const insuranceService = require("../services/insurance.service");


exports.postInsurance = (req, res, next) => {
    var validated = true;
    const data = {
        'insrurance_id' : req.body.insrurance_id,
        'company_name' : req.body.company_name,
        'insurance_pay' : req.body.insurance_pay,
        'copay' : req.body.copay,
        'p_s' : req.body.p_s,
    };

    if(validator.isEmpty(data.insurance_pay , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.company_name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.insurance_pay , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.copay, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validator.isEmpty(data.p_s, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        console.log(data);
        insuranceService.postInsurance(data, (error, results) => {
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
        'insrurance_id' : req.body.insrurance_id,
        'company_name' : req.body.company_name,
        'insurance_pay' : req.body.insurance_pay,
        'copay' : req.body.copay,
        'p_s' : req.body.p_s,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.insrurance_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.company_name, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validator.isEmpty(data.insurance_pay, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.copay, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.p_s, {ignore_whitespace: true})) {
        validated = false;
    }

    
    if(validated){
        insuranceService.updateRecord(data, (error, results) => {
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
