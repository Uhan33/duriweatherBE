// 단기예보조회 API
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

let now = year + month + date;      // ex) 20230806

var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=	ySgwAA4cxcbx7n9F5i08pYGiFyS92Wc%2BjEdGYYvRsa4xCZlP0IbjUpelNxOdowDfjVmlKawIKfmnCnTAKmBLgQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(now); /* */
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /* */
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('60'); /* */
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /* */

url = url + queryParams;
    
router.get("/", async (req, res) => {
    const response = await fetch(url);
    const data = await response.json();

    res.send(data);
});

module.exports = router;
