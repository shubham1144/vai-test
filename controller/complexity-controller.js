const complexity_service = require("./../services/complexity-service");
const util = require("../helpers/util");

/* API Interface to process complexity in the system */
exports.processComplexity = (req, res) => {
    let { mode } = req.query;
    complexity_service[mode && mode === 'verbose' ? 'getVerboseComplexity' : 'getComplexity'](req.body, function(err, result) {
        if (err) {
            return util.formatErrorResponse(err.code, err.error, function(err) {
                res.send(err);
            });
        }
        util.formatSuccessResponse(result, function(
            formatted_result
        ) {
            res.send(formatted_result);
        });
    });
};

/**
 * API Interface to be used to register an nn literal in the system
 * @param req
 * @param res
 */
exports.addNonLexical = (req, res) => {
    complexity_service.addNonLexical(req.body, function(err, result){
        if (err) {
            return util.formatErrorResponse(err.code, err.error, function(err) {
                res.send(err);
            });
        }
        util.formatSuccessResponse(result, function(
            formatted_result
        ) {
            res.send(formatted_result);
        });
    })
};
