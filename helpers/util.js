/**
 * Function to be used to format the error response being sent out
 * @param code
 * @param err_message
 * @param callback
 */
exports.formatErrorResponse = function(code, err_message, callback){

    callback({
        success : false,
        error : err_message
    })

};

/**
 * Function to be used to format the data being sent out as response
 * @param data
 * @param callback
 */
exports.formatSuccessResponse = function(data, callback){
    callback({
        data : {...data}
    })
};
