// 대기오염농도 API
const express = require('express');
const router = express.Router();

var url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=ySgwAA4cxcbx7n9F5i08pYGiFyS92Wc%2BjEdGYYvRsa4xCZlP0IbjUpelNxOdowDfjVmlKawIKfmnCnTAKmBLgQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent('중앙로'); /* 강원도 춘천시 중앙로 관측소*/
queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY'); /* 1일 대기오염 정보 */
queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3'); /* */

url = url + queryParams;
    
router.get("/", async (req, res) => {       //대기 오염 시간대별 총 목록
    const response = await fetch(url);
    const data = await response.json();

    res.send(data);
});

router.get("/value", async (req, res) => {      //현재 시간 대기오염 지수
    const response = await fetch(url);
    const data = await response.json();

    res.send(data.response.body.items[0].pm10Value);
});

/* 미세먼지 등급 1 : 좋음, 2 : 보통, 3 : 나쁨, 4 : 매우나쁨 */
router.get("/grade", async (req, res) => {      //현재 시간 대기오염 등급
    const response = await fetch(url);
    const data = await response.json();

    res.send(data.response.body.items[0].pm10Grade);
});

// 오존 value
router.get("/o3value", async (req, res) => {      
    const response = await fetch(url);
    const data = await response.json();

    res.send(data.response.body.items[0].o3Value);
});

// 이신화질소 value
router.get("/no2value", async (req, res) => {      
    const response = await fetch(url);
    const data = await response.json();

    res.send(data.response.body.items[0].no2Value);
});

// 초미세 value
router.get("/pm25value", async (req, res) => {      //현재 시간 대기오염 지수
    const response = await fetch(url);
    const data = await response.json();

    res.send(data.response.body.items[0].pm25Value);
});

module.exports = router;
