const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

// Connection URL
const url = 'mongodb://localhost:27017'; // var finns databasen

// Database Name
const dbName = process.env.DB_NAME || 'TRELLO'; // vad vi kallar databasen i mongoDB

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true } ); // när vi vill prata med databsaen använder vi clientobjectet
client.connect(); // när man kallar på den så förösker den komma åt databasen



module.exports = {
  getClient: function() {
    return client;
  },

  getDB: function(){
    let client = module.exports.getClient();
    let db = client.db(dbName); 
    return db; 
  },
  createObjectId(id){
    return new ObjectID(id);
  }
}

