const db = require('../models/db.js');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const newsModel = require('../models/news.js');
module.exports = {
    doAddNews: (req,res,next) =>{
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files,next) {
            newsModel.addNews(fields,function(err,doc){
                if(err){
                    console.log("ERROR:" + err );
                    return ;
                }else{
                    res.json({"body":"1","msg":"添加成功"})
                }
            });

        })
    },
    getNewsLists:(req,res,next) =>{
        var pageSize = req.query.pageSize ? req.query.pageSize : 5;
        var page = req.query.page ? (req.query.page - 1) : 0;
        newsModel.getNewsLists(pageSize,page,function(err,doc){
            if(err){
                console.log("ERROR:" + err);
                return false;
            }else{
                res.json({"newsLists": doc});
            }
        });
    },

    getNewsCount: (req,res,next) =>{
        newsModel.getNewsCount(function(err,numbers){
            if(err){
                console.log("ERROR:" + err);
                return;
            }else{
                res.json(numbers);
            }
        });
    },

    getOneNew: (req,res,next)=>{
        var _id = req.query.id;
            newsModel.getOneNew(_id,function(err,doc){
                if(err){
                    console.log("ERROR:" + err);
                    return false;
                }else{
                    res.json({"body":doc});
                }
            });
    },

    updateNews: (req,res,next)=>{
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files,next) {
            newsModel.updateNews(fields,function(err,respone){
                if(err){
                    console.log("ERROR:" + err );
                    return ;
                }else{
                    res.json({"body":"1","msg":"修改成功"})
                }
            });

        })
    },

    deleteNews: (req,res,next)=>{
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files,next) {
            newsModel.deleteNews(fields,function(err,respone){
                if(err){
                    console.log("ERROR:" + err );
                    return ;
                }else{
                    res.json({"body":"1","msg":"删除成功"})
                }
            });

        })
    }
}