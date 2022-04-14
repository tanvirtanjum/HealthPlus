// Importing System Library Modules
const validator = require('validator');
var fs = require('fs');

// Importing Created Modules
const teachersService = require("../services/teachers.service");

exports.getAllTeachers = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        teachersService.getAllTeachers(data, (error, results) => {
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

exports.getCount = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        teachersService.getCount(data, (error, results) => {
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

exports.getTeacher = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        teachersService.getTeacher(data, (error, results) => {
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

exports.getTeacherByLogin = (req, res, next) => {
    var validated = true;
    const data = {
        'login_id' : req.params.id,
    };

    if(validated){
        teachersService.getTeacherByLogin(data, (error, results) => {
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

exports.getTeachersByName = (req, res, next) => {
    var validated = true;
    const data = {
        'name' : "%"+req.params.name+"%",
    };

    if(validated){
        teachersService.getTeachersByName(data, (error, results) => {
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

exports.postTeacher = (req, res, next) => {
    var validated = true;
    const data = {
        'login_id' : req.body.login_id,
        'name' : req.body.name,
        'father_name' : req.body.father_name,
        'mother_name' : req.body.mother_name,
        'contact' : req.body.contact,
        'sex' : req.body.sex,
        'bg' : req.body.bg,
        'religion' : req.body.religion,
        'present_address' : req.body.present_address,
        'permanent_address' : req.body.permanent_address,
        'salary' : req.body.salary,
        'subject_id' : req.body.subject_id,
        'file_no' : req.body.file_no,
        'img_path' : req.body.img_path,
        'employment_status_id' : req.body.employment_status_id,
    };

    if(data.login_id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.father_name , {ignore_whitespace: true})) {
        validated = false;
    }
    
    if(validator.isEmpty(data.mother_name, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.contact, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.sex, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.bg, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.religion, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.present_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.permanent_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.salary, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.subject_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.employment_status_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        teachersService.postTeacher(data, (error, results) => {
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

exports.updateTeacher = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'name' : req.body.name,
        'father_name' : req.body.father_name,
        'mother_name' : req.body.mother_name,
        'contact' : req.body.contact,
        'sex' : req.body.sex,
        'bg' : req.body.bg,
        'religion' : req.body.religion,
        'present_address' : req.body.present_address,
        'permanent_address' : req.body.permanent_address,
        'salary' : req.body.salary,
        'subject_id' : req.body.subject_id,
        'file_no' : req.body.file_no,
        'employment_status_id' : req.body.employment_status_id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.father_name , {ignore_whitespace: true})) {
        validated = false;
    }
    
    if(validator.isEmpty(data.mother_name, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.contact, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.sex, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.bg, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.religion, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.present_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.permanent_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.salary, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.subject_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.employment_status_id, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        teachersService.updateTeacher(data, (error, results) => {
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


exports.updateTeacherImage = (req, res, next) => {
    var validated = true;

    if(req.file == null) {
        validated = false;
    }

    if(validated){
        const data = {
            'id' : req.params.id,
            'img_path': req.file.path,
        };
        teachersService.updateTeacherImage(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                try {
                    fs.unlinkSync(req.header("path"))
                    //file removed
                } 
                catch(err) {
                    console.error(err)
                }
                return res.status(200).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.insertTeacherImage = (req, res, next) => {
    var validated = true;

    if(req.file == null) {
        validated = false;
    }

    if(validated){
        const data = {
            'id' : req.params.id,
            'img_path': req.file.path,
        };
        teachersService.updateTeacherImage(data, (error, results) => {
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

exports.getContact = (req, res, next) => {
    var validated = true;
    const data = {
        'contact' : "%"+req.params.contact+"%",
    };
    // Validation Code here
    // if(!validator.isEmail(data.email)) {
    //     validated = false;
    // }

    if(validated) {
        teachersService.getContact(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    // console.log("1");
                    return res.status(200).send(results[0]);

                } else {
                    // console.log("2");
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        // console.log("3");
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.getFileNo = (req, res, next) => {
    var validated = true;
    const data = {
        'file_no' : "%"+req.params.fileno+"%",
    };
    // Validation Code here
    // if(!validator.isEmail(data.email)) {
    //     validated = false;
    // }

    if(validated) {
        teachersService.getFileNo(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    // console.log("1");
                    return res.status(200).send(results[0]);

                } else {
                    // console.log("2");
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        // console.log("3");
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};