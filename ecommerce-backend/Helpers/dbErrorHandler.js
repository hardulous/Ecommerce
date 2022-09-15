
// for fetching actual error message from large error object

"use strict";
 
/**
 * Get unique error field name
 */

const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.errmsg.substring(
            error.errmsg.lastIndexOf(".$") + 2,
            error.errmsg.lastIndexOf("_1")
        );
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            " already exists";
    } catch (ex) {
        output = "Unique field already exists";
    }
 
    return output;
};
 
/**
 * Get the erroror message from error object
 */
const errorHandler = error => {
    let message = "";
    console.log(error);
    if (error.err.code) {
        switch (error.err.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    } else {

        message = error.errmsg;

    }
 
    return message;
};

module.exports={
    
    errorHandler

};