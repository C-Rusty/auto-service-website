import {MongoClient} from "mongodb";
const DB_URL='mongodb+srv://rost9911:Neymarisc0nt!@cluster0.ehy1pmj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
});


let _database;

const dbo = {
    connectToServer: function (callback) {
        client.connect( function (error, database) {
            if(database) {
                _database = database.db('posts');
                console.log("Successfully connected to MongoDB");
            }
            return callback;
        });
    },

    getDatabase: function () {
        return _database;
    },
};

export default dbo;