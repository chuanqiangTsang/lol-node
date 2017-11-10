const mongoose = require('mongoose');
const db = require('./db.js');
const sd = require('silly-datetime');
const bannerSchema = new mongoose.Schema({
    "desc"         :  {type: String},
    "thumb"        :  {type: String},
    "sort"         :  {type: Number,default: 0},
    "addDate"      :  {type: Date},
    "isDel"        :  {type: Number,default: 0} 
});

bannerSchema.statics.addBanner = (args,callback) =>{
    db.model('banner').insertMany({"desc":args.desc,"thumb":args.thumb,"sort":args.sort,"addDate":sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')},function(err,docs){
        if(err){
            callback(err,null)
        }else{
            callback(null,{"state":"1"});
        }
        
    })
}

bannerSchema.statics.getBanners = (callback)=>{
    db.model('banner').find({"isDel":{$ne:1}},function(err,docs){
        if(err){
            callback(err,null);
        }else{
            callback(null,docs);
        }
    })
}

const bannerModel = db.model('banner',bannerSchema);

module.exports = bannerModel;