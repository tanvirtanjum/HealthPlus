// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const groupsService = require("../services/groups.service");

exports.getAllGroups = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        groupsService.getAllGroups(data, (error, results) => {
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
