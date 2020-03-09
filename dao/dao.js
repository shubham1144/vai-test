/**
 * The DAO Layer - Data access object connection appears here
 */
const mongoose = require('mongoose');

let connection = null;

const nonLexicalSchema = new mongoose.Schema({ value: String });
const NonLexical = mongoose.model('NonLexical', nonLexicalSchema);

async function connectToMongoDb(callback) {
    //@todo : Please replace this with your local mongodb setup
    connection = await mongoose.connect(`mongodb+srv://vaiuser:vaiuser@cluster0-xjwgv.mongodb.net/vai?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await mongoose.connection.dropDatabase();
    //The following initializes the database being used with initial data for the sake of this demo
    initializeData(callback);
}
//Initial connection to mongodb
connectToMongoDb(()=>{
    console.log("Connected to database successfully");
});

async function getNonLexicalModelData(callback){
    const fetchData = async () => {
        try{
            if(connection) {
                let result = await NonLexical.find().exec();
                let finalOutput = result.map((item)=>item.value);
                callback(null, finalOutput);
            }

        }catch(err) {
            console.log("Error occured due to :", err);

        }
    }
    if(connection) {
        fetchData();
    } else {
        connectToMongoDb(fetchData);
    }
};


const initializeData = (callback) => {
    const array = [
        { value : "to"},
        { value : "got"},
        { value : "is"},
        { value : "have"},
        { value : "and"},
        { value : "although"},
        { value : "or"},
        { value : "that"},
        { value : "when"},
        { value : "while"},
        { value : "a"},
        { value : "either"},
        { value : "more"},
        { value : "much"},
        { value : "neither"},
        { value : "my"},
        { value : "that"},
        { value : "the"},
        { value : "as"},
        { value : "no"},
        { value : "nor"},
        { value : "not"},
        { value : "at"},
        { value : "between"},
        { value : "in"},
        { value : "of"},
        { value : "without"},
        { value : "I"},
        { value : "you"},
        { value : "he"},
        { value : "she"},
        { value : "it"},
        { value : "we"},
        { value : "they"},
        { value : "anybody"},
        { value : "one"},
    ];
    NonLexical.insertMany(array)
        .then(function (data) {
            console.log("Inserts for demo successfully complete");
            callback && callback();
        })
        .catch(function (err) {
            console.error("Error occured due to : ", err);
        });
}

module.exports = getNonLexicalModelData;
