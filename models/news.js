const mongoose = require('mongoose');
const db = require('./db.js');
const sd = require('silly-datetime');

const newsSchema = new mongoose.Schema({
    "title":        {"type":String},
    "newsThumb":    {"type":String},
    "author":       {"type":String},
    "content":      {"type":String},
    "addTime":      {"type": Date},
    "isDel"  :      {"type":Number, default: 0}
});


newsSchema.statics.addNews = (args,callback) =>{
    var doc = {
        "title": args.title,
        "newsThumb" : args.newsThumb,
        "author" : args.author,
        "content": args.content,
        "addTime": sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
    db.model('news').insertMany(doc, function(err,doc){
        if(err){
            callback(err,null)
        }else{
            callback(null,doc);
        }
    });
}


newsSchema.statics.getNewsLists = (pageSize,page,callback)=>{
    var skipNum = pageSize * page
    db.model('news').find({"isDel":{$ne:1}},function(err,docs){
        if(err){
            callback(err,null);
        }else{
            callback(null,docs);
        }
    }).sort({"addTime":-1}).skip(skipNum).limit(pageSize)
}

newsSchema.statics.getNewsCount = (callback)=>{
    db.model('news').count({"isDel":{$ne:1}},function(err,docs){
        if(err){
            callback(err,null);
        }else{
            callback(null,docs);
        }
    })
}

newsSchema.statics.getOneNew = (id,callback)=>{
    db.model('news').find({"_id":id,"isDel":0},function(err,doc){
        if(err){
            callback(err,null);
            return false;
        }else{
            callback(null, doc);
        }
    })
}

newsSchema.statics.updateNews = (args,callback)=>{
    db.model('news').updateOne({"_id":args.id},{"title":args.title,"newsThumb": args.newsThumb, "author": args.author, "content": args.content},function(err,res){
      if(err){
          callback(err,null);
          return falsel
      }else{
          callback(null,res);
      }
    })
},

newsSchema.statics.deleteNews = (args,callback)=>{
    db.model('news').updateOne({"_id": args.id},{"isDel": 1},function(err,doc){
        if(err){
            callback(err,null);
            return false;
        }else{
            callback(null,doc);
        }
    });
}


const newsModel = db.model('news',newsSchema);

module.exports =  newsModel;