// Importing System Library Modules
const validator = require('validator');
var fs = require('fs');

// Importing Created Modules
const section_filesService = require("../services/section_files.service");

exports.getAllFilesBySection = (req, res, next) => {
    var validated = true;
    const data = {
        'section_id' : req.params.id,
    };

    if(validated){
        section_filesService.getAllFilesBySection(data, (error, results) => {
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

exports.getFileByID = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        section_filesService.getFileByID(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    // console.log(results); 
                    return res.status(200).send(results);
                }
    
                else {
                    // console.log(results);
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.postSectionFile = (req, res, next) => {
    var validated = true;
    if(req.file == null) {
        validated = false;
    }

    if(validated){
        const data = {
            'section_id' : req.params.id,
            'file_name': req.file.filename,
            //'file_path': process.env.SERVER_IP+'\\'+req.file.path,
            'file_path': req.file.path,
        };
    
        section_filesService.postSectionFile(data, (error, results) => {
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

exports.deleteFileByID = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(data.id <= 0) {
        validated = false;
    }

    if(validated){
        section_filesService.deleteFileByID(data, (error, results) => {
            if (error) {
                // console.log(error);
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
                // console.log(req.header("path"))
                return res.status(204).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};