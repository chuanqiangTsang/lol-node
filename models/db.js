const mongoose = require('mongoose');
const Config = require('../config/dbconfig.js')
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(Config.url,Config.dbname);
db.on('error',function(err){
    console.log('Connection Error:' + err);
})

db.on('open',(err)=>{
    if(!err){
        console.log('MongoDB Connected!')
    }
})

db.on('disconnected', (err)=>{
    if(!err){
        console.log('MongoDB Disconnected, Please connect mongoDB again!');
    }
});
db.on('close', (err)=>{
    if(!err){
        console.log('MongoDB Close');
    }
	
});

module.exports = db;