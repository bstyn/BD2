const data = require('./data.json')

var MongoClient = require('mongodb').MongoClient;
const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'local'
};
MongoClient.connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    dbo.collection("keyboards").insertMany(data, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  }); 