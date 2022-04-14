// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const loginsService = require("../services/logins.service");


exports.getUser = (req, res, next) => {
    var validated = true;
    const data = {
        'username' : req.body.username,
        'password' : req.body.password,
    };
    // Validation Code here
    if(!validator.isEmail(data.email)) {
        validated = false;
    }
    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.getUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.updateUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'password' : req.body.password,
    };
    // Validation Code here
    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.updateUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.postUser = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
        'password' : req.body.password,
        'role_id' : req.body.role_id,
        'access_id' : req.body.access_id,
    };

    if(validator.isEmpty(data.email , {ignore_whitespace: true})) {
        validated = false;
    }

    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.role_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.access_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        loginsService.postUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {

                // console.log(results);
                return res.status(201).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getEmail = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : "%"+req.params.email+"%",
    };
    // Validation Code here
    // if(!validator.isEmail(data.email)) {
    //     validated = false;
    // }

    if(validated) {
        loginsService.getEmail(data, (error, results) => {
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

exports.getLogin = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };
    // Validation Code here

    if(validated) {
        loginsService.getLogin(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.updateUserEmail = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'email' : req.body.email,
    };
    // Validation Code here
    if(validator.isEmpty(data.email , {ignore_whitespace: true})) {
        validated = false;
    }

    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    emailCheck(data.email)
    .then(function (res) {
        // Returns "true" if the email address exists, "false" if it doesn't.
    })
    .catch(function (err) {
        if (err.message === 'refuse') {
        // The MX server is refusing requests from your IP address.
        validated = false;
        } else {
        // Decide what to do with other errors.
        validated = false;
        }
    });

    if(validated) {
        loginsService.updateUserEmail(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                // console.log(13);
                return res.status(200).send(results);
            }
        });
    } else{
        // console.log(11);
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.updateUserRole = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
        'role_id' : req.body.role_id,
        'access_id': req.body.access_id
    };
    // Validation Code here
    if(validator.isEmpty(data.role_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.access_id , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        loginsService.updateUserRole(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                // console.log(13);
                return res.status(200).send(results);
            }
        });
    } else{
        // console.log(11);
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.getUserLogout = (req, res, next) => {
    return res.status(200).send({ success: true, data: "User Logged Out." });
};