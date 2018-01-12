var express = require('express');
var cheerio = require('cheerio');//node版的jquery
var app = express();
var request = require('superagent');//向第三方网站发出请求
var iconv = require('iconv-lite');//解决gb2312乱码

let url = "http://chuanke.baidu.com/";
let query = 'mod=note&act=my&page=';
let result = cheerio.load('<div class="container"></div>', { decodeEntities: false });
cookie = '';//从浏览器中获取你的cookie，如果你获取的网页不需要登录验证，那header都不需要设置

// for (let i = 63; i > 62; i--) {
let i = 62;
let _url = url + '?' + query + i;
request
    .get(_url)
    .set({ 'Accept': 'application/json, text/javascript, */*' })
    .set({ 'Accept-Encoding': 'gzip, deflate' })
    .set({ 'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7' })
    .set({ 'Connection': 'keep-alive' })
    .set({ 'Host': 'chuanke.baidu.com' })
    .set({ 'Referer': _url })
    .set({ 'Cookie': cookie })
    .set({ 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36' })
    .set({ 'X-Requested-With': 'XMLHttpRequest' })
    .query(`${query + i}`)
    .then(function (res) {
        // if (err) {
        //     return result.append(err);
        // }
        //var html = iconv.decode(res.text, 'utf8');
        var $ = cheerio.load(res.text, { decodeEntities: false });
        $(".note-list").children("li").each(function (i, elem) {
            if (i % 2 == 0) {
                console.log(i);
                result('div.container').append($(this).children(".note-main").html());
            }
        });
        debugger;
    }).catch(function (err) {
        console.log(err);
    });
// }


app.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.send(result.html());
    res.end();
});

app.listen(8321, function (req, res) {
    console.log("app is running at port 8321");
});












