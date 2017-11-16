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

bannerSchema.statics.getBanners = (pageSize,page,callback)=>{
    var skipNum = pageSize * page
    db.model('banner').find({"isDel":{$ne:1}},function(err,docs){
        if(err){
            callback(err,null);
        }else{
            callback(null,docs);
        }
    }).sort({"addDate":-1}).skip(skipNum).limit(pageSize)
}

bannerSchema.statics.getBannersCount = (callback)=>{
    db.model('banner').count({"isDel":{$ne:1}},function(err,docs){
        if(err){
            callback(err,null);
        }else{
            callback(null,docs);
        }
    })
}

bannerSchema.statics.deleteBanner = (id,callback)=>{
    db.model('banner').findOneAndRemove({"_id":id},function(err,docs){
        if(err){
            callback(err,null);
        }else{
            callback(null,docs);
        }
    })
}

const bannerModel = db.model('banner',bannerSchema);

module.exports = bannerModel;