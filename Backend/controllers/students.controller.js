// Importing System Library Modules
const validator = require('validator');
var fs = require('fs');

// Importing Created Modules
const studentService = require("../services/students.service");

exports.getAllStudent = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        studentService.getAllStudent(data, (error, results) => {
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
        studentService.getCount(data, (error, results) => {
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

exports.getStudent = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        studentService.getStudent(data, (error, results) => {
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

exports.getStudentByLogin = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        studentService.getStudentByLogin(data, (error, results) => {
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

exports.getStudentsByNameID = (req, res, next) => {
    var validated = true;
    const data = {
        'para' : "%"+req.params.para+"%",
    };

    if(validated){
        studentService.getStudentsByNameID(data, (error, results) => {
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

exports.postStudent = (req, res, next) => {
    var validated = true;
    const data = {
        'login_id' : req.body.login_id,
        'name' : req.body.name,
        'student_id' : req.body.student_id,
        'father_name' : req.body.father_name,
        'mother_name' : req.body.mother_name,
        'contact' : req.body.contact,
        'sex' : req.body.sex,
        'admission_class_id' : req.body.admission_class_id,
        'admission_group_id' : req.body.admission_group_id,
        'religion' : req.body.religion,
        'present_address' : req.body.present_address,
        'permanent_address' : req.body.permanent_address,
        'cur_class_id' : req.body.cur_class_id,
        'cur_group_id' : req.body.cur_group_id,
        'wing_id' : req.body.wing_id,
        'studentship_id' : req.body.studentship_id,
    };

    if(data.login_id <= 0) {
        validated = false;
    }

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.student_id , {ignore_whitespace: true})) {
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


    if(validator.isEmpty(data.present_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.permanent_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        studentService.postStudent(data, (error, results) => {
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

exports.updateStudent = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'name' : req.body.name,
        'student_id' : req.body.student_id,
        'father_name' : req.body.father_name,
        'mother_name' : req.body.mother_name,
        'contact' : req.body.contact,
        'sex' : req.body.sex,
        'admission_class_id' : req.body.admission_class_id,
        'admission_group_id' : req.body.admission_group_id,
        'religion' : req.body.religion,
        'present_address' : req.body.present_address,
        'permanent_address' : req.body.permanent_address,
        'cur_class_id' : req.body.cur_class_id,
        'cur_group_id' : req.body.cur_group_id,
        'wing_id' : req.body.wing_id,
        'studentship_id' : req.body.studentship_id,
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

    if(validator.isEmpty(data.religion, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.present_address, {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.permanent_address, {ignore_whitespace: true})) {
        validated = false;
    }


    if(validated){
        studentService.updateStudent(data, (error, results) => {
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


exports.updateStudentClassGroup = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'cur_class_id' : req.body.cur_class_id,
        'cur_group_id' : req.body.cur_group_id,
    };

    if(data.id <= 0) {
        validated = false;
    }


    if(validated){
        studentService.updateStudentClassGroup(data, (error, results) => {
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


exports.updateStudentImage = (req, res, next) => {
    var validated = true;

    if(req.file == null) {
        validated = false;
    }

    if(validated){
        const data = {
            'id' : req.params.id,
            'img_path': req.file.path,
        };
        studentService.updateStudentImage(data, (error, results) => {
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

exports.insertStudentImage = (req, res, next) => {
    var validated = true;

    if(req.file == null) {
        validated = false;
    }

    if(validated){
        const data = {
            'id' : req.params.id,
            'img_path': req.file.path,
        };
        studentService.updateStudentImage(data, (error, results) => {
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


exports.getStudentByStudentID = (req, res, next) => {
    var validated = true;
    const data = {
        'student_id' : "%"+req.params.student_id+"%",
    };

    if(validated) {
        studentService.getStudentByStudentID(data, (error, results) => {
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