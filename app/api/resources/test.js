
const express = require('express');
const router = express.Router();
    
router.get("/", async (req, res) => {
    var request = require('request');

    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=	ySgwAA4cxcbx7n9F5i08pYGiFyS92Wc%2BjEdGYYvRsa4xCZlP0IbjUpelNxOdowDfjVmlKawIKfmnCnTAKmBLgQ%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20230804'); /* */
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0600'); /* */
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('60'); /* */
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /* */

    const response = await fetch(url + queryParams);
    const data = await response.json();
    res.status(200).json(data);

    
    
});

    module.exports = router;
