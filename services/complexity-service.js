
const getNonLexicalModelData = require("./../dao/dao.js");
const message = require("./../helpers/message.json");

/**
 * Function to return the lexical density of the inputted text.
 * @param data
 * @param callback
 */
exports.getComplexity = async function(data, callback) {

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
    let overAllDensity = await getLexicalDensity(textContent);
    callback(null, {
        overall_ld : overAllDensity
    });
};

/**
 * Function to return the lexical density of the inputed text whicb is a sentence.
 * @param data
 * @param callback
 */
exports.getVerboseComplexity = async function(data, callback) {
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
    let overAllDensity = await getLexicalDensity(textContent);
    finalDataOutput.overall_ld = overAllDensity;

    const pArray = sentenceList.map(async sentence => {
        let value = await getLexicalDensity(sentence);
        return value;
    });
    finalDataOutput.sentence_ld = await Promise.all(pArray);
    callback(null, finalDataOutput);
};


async function getLexicalDensity(sentence) {
    return new Promise((resolve, reject) => {
        getNonLexicalModelData((err, nonLexicalData) => {
            if(err) reject ({
                code: 500,
                error : "Database Connection Error"
            });
            let inputArray = sentence.split(/\s+/);
            let totalWordsLength = inputArray.length;
            let lexicalDataArray;
            lexicalDataArray =  inputArray.filter((word) =>{
                if(nonLexicalData.indexOf(word) == -1) {
                    return true;
                } else return false;
            })
            const lexicalWordsLength = lexicalDataArray.length;
            const lexicalDensity = parseFloat(lexicalWordsLength/totalWordsLength).toFixed(2);
            resolve(parseFloat(lexicalDensity));
        });
    });

}
