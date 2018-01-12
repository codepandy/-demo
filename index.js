var express = require('express');
var cheerio = require('cheerio');//node版的jquery
var app = express();
var request = require('superagent');//向第三方网站发出请求
var iconv = require('iconv-lite');//解决gb2312乱码

let url = "http://chuanke.baidu.com/";
let query = 'mod=note&act=my&page=';
let result = cheerio.load('<div class="container"></div>', { decodeEntities: false });
let cookie = 'BAIDUID=80FE871A4DFE35C676AE8415AC8F73FD:FG=1; BIDUPSID=80FE871A4DFE35C676AE8415AC8F73FD; PSTM=1507874429; _ck_uName=1507874837363912669642; bdshare_firstime=1507884533586; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; PHPSESSID=l8ta8c98rr6c3vlqtgcv5j8p74; BDUSS=Es2VDNBOXMyWHpOTUhIbTJ1dkpqdVhENmxJeHZVZng2cG5nTXI1SmlZNUctSHhhQVFBQUFBJCQAAAAAAAAAAAEAAACAS6UIsNnN9cXztsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEZrVVpGa1VaM; H_PS_PSSID=1433_21095_17001_22158; MCITY=-%3A; SchoolStorage=%7B%7D; Hm_lvt_738bf04c465a86f1abbac8e1822bde3e=1514953016,1515029797,1515399429,1515720891; BDSFRCVID=3a-sJeCCxG3wBUcAS5nZLqiK44_-JdjDIBG33J; H_BDCLCKID_SF=tbkD_C-MfIvhDRTvhCcjh-FSMgTBKI62aKDsWDQ1-hcqEpO9QTbb-U0SLfP8L-je-65xLDnnWIQNVfP4h-rTDUThjG0qq60DJR3fL-08a-J2DTrnhPF334DrKP6-3MJO3b7faROm0RABKqr3DtvBMMtu-qOO3-5A-Kv8ohFLtC0BhI-GD6Rjh-FSMU-X543LK67J04_8Kb7VKROkeTjfLJtpbtbmhU-ebanx2hjOfx7BHqTMBpQ4jMPTLgFH2-cTKJ7ZVD_2JIK-MIDmenJb5ICXMqj-btj-5Po2WbCQLMohqpcNLTDK2bk7qH8t3lttam_t-UjP2bChbb3KDpO1j4_eXRrOQjQnBj7A3Co80lCbol5jDh3UXjksD-Rt5futbCoy0hvctn6cShnCyl00j6bbjGKtJ5n2aI52B5rqanTBfJuk-PnVeTt_qqbZKxJmMgkeLhoGKhj6MJrLXbQEyT33BgcZKPTRWmrxoKOFfJOKHIClD5LKDf5; PSINO=1; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; ck_refer=baidu; _ck_uName=1515736594870422625790; ck_login_times=1; _uck_page=1515736594152021581; _uck_from=30000; statistics_first_referer=http%3A%2F%2Fchuanke.baidu.com%2F%3Fmod%3Dnote%26act%3Dmy; FP_UID=e2f0be2f9b91f9d2ba67dd3315edecd6; SessionIDKey=3216083144%093216083162aveni4; AuthInfo=eyJ1c2VyaWQiOiI0ODAyOTM1IiwidXNlcm5hbWUiOiIxNDUwNTA0OTZAYXV0b2JhaWR1LmNvbSIsIm5pY2tuYW1lIjoiXHU3NjdlXHU3MzhiXHU2NzBiXHU1ZWE2IiwiaGFzaCI6IjEyOGI3NGZmNDBkYmM5NGUyM2Y5ZmE5MmFiY2YyMTcxIn0%3D; last_login_type=2; ServerLogin=ok; Hm_lpvt_738bf04c465a86f1abbac8e1822bde3e=1515736606';

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












