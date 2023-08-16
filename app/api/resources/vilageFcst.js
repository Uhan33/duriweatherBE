// 단기예보조회 API
const express = require('express');
const router = express.Router();

var today = new Date();

var year = today.getFullYear();
var month = today.getMonth() + 1;
if(month < 10)
    month = '0' + month;

var date = today.getDate();


var fDate;
var hour = today.getHours();
var hourCheck = today.getHours();

hour += 9;
if(hour > 23) {
    hour -= 24;
    date += 1;
    fDate = date;
    if(hour < 7)
        date -= 1;                      // 05시 이전이면 전날을 기준으로 찾는다.
}else {fDate = date;}

console.log(hour, hourCheck);


if(date < 10)
    date = '0' + date;

if(fDate < 10)
    fDate = "0" + fDate;

let now = year + month + date;      // ex) 20230806
let fNow = year + month + fDate;

console.log(now, fNow);

if(hour < 10)
    hour = '0' + hour;
hour = hour + '00';      // ex) 0900

if(hourCheck < 10)
    hourCheck = '0' + hourCheck;
hourCheck = hourCheck + '00';

console.log(hour, hourCheck);

var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=	ySgwAA4cxcbx7n9F5i08pYGiFyS92Wc%2BjEdGYYvRsa4xCZlP0IbjUpelNxOdowDfjVmlKawIKfmnCnTAKmBLgQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(now); /* */
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /* */
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('73'); /* */
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('134'); /* */

url = url + queryParams;
    
router.get("/", async (req, res) => {
    const response = await fetch(url);
    const data = await response.json();

    res.send(data);
});

// 맑음, 흐림 등을 코드로 보내줌
router.get("/sky", async (req, res) => {    // 맑음 : 1, 구름조금 : 2, 구름많음 : 3, 흐림 : 4
    const response = await fetch(url);
    const data = await response.json();

    for(var i = 0; i < 1000; i++) {
        if(hour == data.response.body.items.item[i].fcstTime && fNow == data.response.body.items.item[i].fcstDate && "SKY" == data.response.body.items.item[i].category) {
            break;
        }
    }
    res.send(data.response.body.items.item[i].fcstValue);
});

router.get("/skycheck", async (req, res) => {    // 맑음 : 1, 구름조금 : 2, 구름많음 : 3, 흐림 : 4
    const response = await fetch(url);
    const data = await response.json();

    for(var i = 0; i < 1000; i++) {
        if(hourCheck == data.response.body.items.item[i].fcstTime && now == data.response.body.items.item[i].fcstDate && "SKY" == data.response.body.items.item[i].category)
            break;
    }
    res.send(data.response.body.items.item[i]);
});

// 강수형태를 코드로 보내줌
router.get("/pty", async (req, res) => {    // 없음 : 0, 비 : 1, 비/눈 : 2, 눈 : 3, 소나기 : 4
    const response = await fetch(url);
    const data = await response.json();

    for(var i = 0; i < 1000; i++) {
        if(hour == data.response.body.items.item[i].fcstTime && fNow == data.response.body.items.item[i].fcstDate && "PTY" == data.response.body.items.item[i].category) {
            break;
        }
    }
    res.send(data.response.body.items.item[i].fcstValue);
});

router.get("/ptycheck", async (req, res) => {    // 없음 : 0, 비 : 1, 비/눈 : 2, 눈 : 3, 소나기 : 4
    const response = await fetch(url);
    const data = await response.json();

    for(var i = 0; i < 1000; i++) {
        if(hourCheck == data.response.body.items.item[i].fcstTime && now == data.response.body.items.item[i].fcstDate && "PTY" == data.response.body.items.item[i].category)
            break;
    }
    res.send(data.response.body.items.item[i]);
});

// 습도를 보내줌
router.get("/reh", async (req, res) => {    // %로 내보내는듯.
    const response = await fetch(url);
    const data = await response.json();

    for(var i = 0; i < 1000; i++) {
        if(hourCheck == data.response.body.items.item[i].fcstTime && now == data.response.body.items.item[i].fcstDate && "REH" == data.response.body.items.item[i].category)
            break;
    }
    res.send(data.response.body.items.item[i].fcstValue);
});

// 풍속을 내보내줌 (wsd)
router.get("/wsd", async (req, res) => {  
    const response = await fetch(url);
    const data = await response.json();

    for(var i = 0; i < 1000; i++) {
        if(hourCheck == data.response.body.items.item[i].fcstTime && now == data.response.body.items.item[i].fcstDate && "WSD" == data.response.body.items.item[i].category)
            break;
    }
    res.send(data.response.body.items.item[i].fcstValue);
});

// 풍향을 내보내줌 (vec)
router.get("/vec", async (req, res) => {  
    const response = await fetch(url);
    const data = await response.json();

    for(var i = 0; i < 1000; i++) {
        if(hourCheck == data.response.body.items.item[i].fcstTime && now == data.response.body.items.item[i].fcstDate && "VEC" == data.response.body.items.item[i].category)
            break;
    }
    res.send(data.response.body.items.item[i].fcstValue);
});

module.exports = router;
