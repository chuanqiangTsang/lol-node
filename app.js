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

app.use('/banners',express.static('./uploads/banners'))

const router = require('./router/router.js');
const news = require('./router/news.js');
app.post('/dologin',router.doLogin)

app.post('/dologout',router.doLogout)

app.post('/doUploadBanner',router.doUploadBanner);

app.post('/doAddBanner',router.doAddBanner);

app.get('/getBanners',router.getBanners);

app.get('/getBannersCount',router.getBannersCount)

app.post('/deleteBanner',router.deleteBanner)

app.post('/doAddNews',news.doAddNews)

app.get('/getNewsLists',news.getNewsLists)

app.get('/getNewsCount',news.getNewsCount)

app.get('/getOneNew',news.getOneNew)

app.post('/updateNews',news.updateNews)

app.post('/deleteNews',news.deleteNews)

app.listen('3002')