const mongoose = require('mongoose');
const db = require('./db.js');
const sd = require('silly-datetime');
const userSchema = new mongoose.Schema({
    "username"    :  {type: String},
    "password"    :  {type: String},
    "level"       :  {type: Number,default: 0},
    "registerDate":  {type: Date},
    "isLogin"     :  {type: Boolean,default: false} 
});

var isLogin = false;

// 静态方法：找一类人   实例方法： 找特定的一个人
userSchema.statics.dologin = (username,password,callback)=>{
    db.model('user').find({'username':username,'password':password},function(err,result){
        if(err){
            callback(err,null);
        }else{
            isLogin = true;
            callback(null,result);
        }
    })
}

userSchema.statics.chklogin = ()=>{
    if(isLogin){
        return true;
    }else{
        return false;
    }
}

userSchema.statics.doLogout = (username,callback)=>{
    db.model('user').find({'username':username},function(err,result){
        if(err){
            callback(err,null);
        }else{
            var isLogout = result[0].isLogin = false;
            callback(null,{"isLogoutFlag":true,"isLogout":isLogout});
        }
    })
}

const userModel = db.model('user',userSchema);


module.exports = userModel;