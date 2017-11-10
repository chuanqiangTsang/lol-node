const db = require('../models/db.js');
const userModel = require('../models/user.js');
const bannerModel = require('../models/banner.js');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = {
    doLogin: (req,res,next) =>{
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files,next) {
            userModel.dologin(fields.username,fields.password,function(err,result){
                var t_islogin = userModel.chklogin();
                if(result.length <= 0){
                    if(err){
                        console.log('error:' + err);
                    }
                    res.json({"body":"-1","msg":"登录失败"});
                }else{
                    res.json({"body":"1","isLogin": t_islogin});
                }
            })
        })
    },

    doLogout: (req,res,next) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files,next) {
            userModel.doLogout(fields.username,function(err,result){
                if(result.isLogoutFlag){
                    res.json({'body':'1',isLogout: result.isLogout})
                }else{
                    res.json({'body':'0','msg':'注销失败'})
                }
            })
        })
    },

    doUploadBanner: (req,res,next)=>{
        var form = new formidable.IncomingForm();
        var prefix = new Date().getTime();
        form.uploadDir = path.normalize(__dirname + '/../uploads/banners');
        form.parse(req, function(err, fields, files,next) {
            var oldpath = files.banner.path;
            var newpath = path.normalize(__dirname + '/../uploads/banners/') + (prefix + path.extname(files.banner.name));
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    console.log('ERROR:'+ err);
                    return ;
                }
                var thumb = 'http://127.0.0.1:3002/banners/' + (prefix + path.extname(files.banner.name));
                res.json({"status":"ok","thumb":thumb});
            })
    });
},

doAddBanner: (req,res,next)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files,next) {
        //console.log(fields);
        var data = {"desc":fields.desc,"thumb":fields.thumb,"sort":parseInt(fields.sort)}
        bannerModel.addBanner(data,function(err,result){
            if(err){
                console.log("ERROR:" + err);
                return;
            }
            if(result.state == '1'){
                res.json({"body":"1"});
            }
        })
    });
},

getBanners: (req,res,next)=>{
    bannerModel.getBanners(function(err,docs){
        if(err){
            console.log("ERROR:" + err);
            return;
        }else{
            res.json({"bannerLists":docs})
        }

    });
},

}