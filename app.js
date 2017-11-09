const express = require('express');
const app = express();
const session = require('express-session');
// 允许跨域
const cors = require('cors');
app.use(cors());

app.use(session({
    resave: false, // don't save session if unmodified  
    saveUninitialized: false, // don't create session until something stored  
    secret: 'love'
}))

const router = require('./router/router.js');

app.post('/dologin',router.doLogin)

app.post('/dologout',router.doLogout)

app.listen('3002')