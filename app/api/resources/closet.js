const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const result = await prisma.recommend.findMany();
    res.json(result);
});


router.get("/top", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");

    const temperature = await tempResponse.json();

    const top = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "상의"}
            ]
        },
        select: {name:true, img_url:true, temperature:true}
    });

    const ran = Math.floor(Math.random() * top.length);
    console.log(top[ran]);
    res.json(top[ran]);
});

router.get("/sopum", async (req, res) => {
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst/pyt");
    const pyt = await pytResponse.json();

    // 우산 꺼내기 해두고
    const umbrella = await prisma.recommend.findMany({
        where: {
            AND : [
                {
                    OR : [
                            {weather : "1"}, {weather : "2"}, {weather : "3"}, {weather : "4"}
                    ]
                },
                {c_type : "소품"}
            ]
        },
        select: {name:true, img_url:true}
    });

    const sopum = await prisma.recommend.findMany({
        where: {
            AND : [
                {temperature : {
                    gt : 22,
                    lte : 30
                }},
                {c_type : "소품"}]
        },
        select: {name:true, img_url:true}
    });

    // 없음 : 0, 비 : 1, 비/눈 : 2, 눈 : 3, 소나기 : 4
    // 이걸로 날씨 여부 따지고 리스트에 우산을 몇개 더 넣어서 우산이 나올 확률을 더 키워야겠다. (이거아직반영안됨)
    if(Number(pyt) == 0) {
        console.log("비나 눈이 안옴");
    }
    else {
        console.log("비나 눈이 오고있으니 우산을 챙겨야할듯...");
        newsopum = sopum.concat(umbrella);
    }

    const ran = Math.floor(Math.random() * newsopum.length);
    console.log("이 인덱스의 녀석이 나와야함: ", ran)
    console.log(newsopum[ran]);
    res.json(newsopum[ran]);
})


module.exports = router;