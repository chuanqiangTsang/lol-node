const db = require('../models/db.js');
const userModel = require('../models/user.js');
const formidable = require('formidable');
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
    }
}