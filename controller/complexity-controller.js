const complexity_service = require("./../services/complexity-service");
const util = require("../helpers/util");

/* API Interface to register a plan in the System*/
exports.processComplexity = (req, res) => {
    let { mode } = req.query;
    complexity_service[mode && mode === 'verbose' ? 'getVerboseComplexity' : 'getComplexity'](req.body, function(err, result) {
        if (err) {
            return util.formatErrorResponse(err.code, err.message, function(err) {
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
