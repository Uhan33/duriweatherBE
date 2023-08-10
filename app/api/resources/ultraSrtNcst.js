// 초단기실황조회 API
const express = require('express');
const router = express.Router();

let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
if(month < 10)
    month = '0' + month;

let date = today.getDate();
if(date < 10)
    date = '0' + date;

let hour = today.getHours();
let min = today.getMinutes();
if(min < 30)
    hour -= 1;      // 정각에 데이터가 업데이트되지 않아 30분 까진 이전 시간대를 사용

if(hour < 10)
    hour = '0' + hour;
hour = hour + '00'      // ex) 0900

let now = year + month + date;  // ex) 20230806

var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=	ySgwAA4cxcbx7n9F5i08pYGiFyS92Wc%2BjEdGYYvRsa4xCZlP0IbjUpelNxOdowDfjVmlKawIKfmnCnTAKmBLgQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(now); /* */
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hour); /* */
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('73'); /* */
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('134'); /* */

url = url + queryParams;
    
router.get("/", async (req, res) => {
    const response = await fetch(url);
    const data = await response.json();

    res.send(data);
});

router.get("/T1H", async (req, res) => {
    const response = await fetch(url);
    const data = await response.json();

    res.send(data.response.body.items.item[3].obsrValue);
});

module.exports = router;
