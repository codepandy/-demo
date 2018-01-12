var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');

let url = "http://chuanke.baidu.com/";
let query = 'mod=note&act=my&page=';
let result = cheerio.load('<div></div>');
let cookie = '';//从浏览器中获取你的cookie，如果你获取的网页不需要登录验证，那header都不需要设置


var option = {
    host: 'chuanke.baidu.com',
    method: 'GET',
    path: "/?" + query + 62,
    headers: {
        'Accept': 'application/json, text/javascript, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'Connection': 'keep-alive',
        'Host': 'chuanke.baidu.com',
        //'Referer': _url,
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
    }
}
// for (let i = 63; i > 62; i--) {
let i = 62;
let _url = url + '?' + query + i;

var req=http.request(option, function (sres) {

    var chunks = [];
    sres.on('data', function (chunk) {
        chunks.push(chunk);
    });

    sres.on('end', function () {
        var titles = [];
        //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
        //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
        var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
        var $ = cheerio.load(html, { decodeEntities: false });
        $(".note-list").children("li").each(function (i, elem) {
            result('div').append($(this).children(".note-main").html());
        });
        console.log(titles);
    });
});
req.on('error', function (e) {
    console.log(`error:${e.message}`);
});
req.end();
