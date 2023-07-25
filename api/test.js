export default function handler(req, res) {
    const { name = 'duri'} = req.query;
    return res.send(`${name} 의 Test 입니다`);
}