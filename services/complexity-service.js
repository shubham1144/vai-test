const dao = require("./../dao/dao.js");

/**
 * Function to return the lexical density of the inputted text.
 * @param data
 * @param callback
 */
exports.getComplexity = async function(data, callback) {
    try{
        let { textContent } = data;
        if(!textContent) return callback({
            code: 400,
            error : "Please provide textContent"
        });
        if(textContent.split(/\s+/).length > 100 ||  textContent.split(" ").length > 1000) {
            return callback({
                code: 400,
                error : "Only texts with up to 100 words or up to 1000 characters are valid input."
            });
        }
        let nonLexicalList = await getNonLexicalList();
        let overAllDensity = getLexicalDensity(textContent, nonLexicalList);
        callback(null, {
            overall_ld : overAllDensity
        });
    } catch(err) {
        callback({
            code: err.code || 500,
            error : err.error || "Internal Server Error"
        });
    }
};

/**
 * Function to return the lexical density of the inputed text whicb is a sentence.
 * @param data
 * @param callback
 */
exports.getVerboseComplexity = async function(data, callback) {
    try{
        let { textContent } = data;
        if(!textContent) return callback({
            code: 400,
            error : "Please provide textContent"
        });
        if(textContent.split(/\s+/).length > 100 ||  textContent.split(" ").length > 1000) {
            return callback({
                code: 400,
                error : "Only texts with up to 100 words or up to 1000 characters are valid input."
            });
        }
        let sentenceList =  textContent.split(".");
        let finalDataOutput = {
            sentence_ld: [],
            overall_ld: 0
        };
        let nonLexicalList = await getNonLexicalList();
        let overAllDensity = getLexicalDensity(textContent, nonLexicalList);
        finalDataOutput.overall_ld = overAllDensity;
        finalDataOutput.sentence_ld = sentenceList.map( sentence => {
            let value = getLexicalDensity(sentence, nonLexicalList);
            return value;
        });
        callback(null, finalDataOutput);
    } catch(err) {
        callback({
            code: err.code || 500,
            error : err.error || "Internal Server Error"
        });
    }
};

/**
 * Function to be used to get the non lexical list from mongodb
 * @returns {Promise<void>}
 */
async function getNonLexicalList() {
    return new Promise((resolve, reject) => {
        dao.getNonLexicalModelData((err, nonLexicalData) => {
            if(err) reject ({
                code: 500,
                error : "Database Connection Error"
            });
            resolve(nonLexicalData);
        });
    });

}

/**
 * Function to be used to get lexical density associated with a sentence.
 * @param sentence
 * @param nonLexicalList
 */
function getLexicalDensity(sentence, nonLexicalList) {
    let inputArray = sentence.split(/\s+/);
    let totalWordsLength = inputArray.length;
    let lexicalDataArray =  inputArray.filter((word) =>{
        if(nonLexicalList.indexOf(word) == -1) {
            return true;
        } else return false;
    });
    let lexicalWordsLength = lexicalDataArray.length;
    let lexicalDensity = parseFloat(lexicalWordsLength/totalWordsLength).toFixed(2);
    return (parseFloat(lexicalDensity));
}

/**
 * Function to register a non literal in the system
 * @param data
 * @param callback
 * @returns {Promise<*>}
 */
exports.addNonLexical = async function(data, callback) {
    let { value } = data;
    if(!value) return callback({
        code: 400,
        error : "Please provide textContent"
    });

    dao.addNonLexicalModelData(value, (err) => {
        if(err) callback ({
            code: 500,
            error : "Database Connection Error"
        });
        callback(null, { message: "New Non Lexical Value registered successfully"});
    });
};
