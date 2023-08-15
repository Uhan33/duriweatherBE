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

    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();

    const sopum = await prisma.recommend.findMany({
        where: {
            AND : [
                {temperature : {
                    gt : (temperature-2),
                    lte : (temperature+2)
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

router.get("/pants", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");

    const temperature = await tempResponse.json();

    const pants = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "하의"}
            ]
        },
        select: {name:true, img_url:true, temperature:true}
    });

    const ran = Math.floor(Math.random() * pants.length);
    console.log(pants[ran]);
    res.json(pants[ran]);
});

router.get("/jacket", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");

    const temperature = await tempResponse.json();

    const jacket = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "겉옷"}
            ]
        },
        select: {name:true, img_url:true, temperature:true}
    });

    const ran = Math.floor(Math.random() * jacket.length);
    console.log(jacket[ran]);
    res.json(jacket[ran]);
});

router.post("/", async (req, res) => {
    const outerList = ["패딩", "무스탕", "코트", "플리스/뽀글이", "점퍼", "자켓", "후드집업", "가디건", "없음"];
    const topList = ["니트/스웨터", "후드티셔츠", "맨투맨/스웨터셔츠", "셔츠/블라우스", "긴팔 티셔츠", "반소매 티셔츠", "민소매 티셔츠", "없음"];
    const bottomList = ["데님 팬츠", "코튼 팬츠", "슈트팬츠/슬랙스", "트레이닝/조거 팬츠", "레깅스", "숏 팬츠", "스커트", "원피스", "없음"];
    const accList = ["비니", "볼캡", "우산", "없음"];

    const { outer, top, bottom, acc } = req.body;
    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");
    const skyResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//sky");
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//pyt");

    const temperature = await tempResponse.json();
    const sky = await skyResponse.json();
    const pyt = await pytResponse.json();

    for(let i = 0; i < outerList.length-1; i++) {
        if(outerList[i] == outer) {
            const createdOuter = await prisma.recommend.upsert({
                where:{name : outer},
                update: {},
                create: {
                  name : outer,
                  temperature : temperature,
                  weather : sky == 0 ? String(sky) : String(pyt+4),
                  c_type : "겉옷",
                  img_url : ""
                },
              });
        }
    }

    for(let i = 0; i < topList.length-1; i++) {
        if(topList[i] == top) {
            const createdTop = await prisma.recommend.upsert({
                where:{name : top},
                update: {},
                create: {
                  name : top,
                  temperature : temperature,
                  weather : sky == 0 ? String(sky) : String(pyt+4),
                  c_type : "상의",
                  img_url : ""
                },
              });
        }
    }

    for(let i = 0; i < bottomList.length-1; i++) {
        if(bottomList[i] == bottom) {
            const createdBottom = await prisma.recommend.upsert({
                where:{name : bottom},
                update: {},
                create: {
                  name : bottom,
                  temperature : temperature,
                  weather : sky == 0 ? String(sky) : String(pyt+4),
                  c_type : "하의",
                  img_url : ""
                },
              });
        }
    }

    for(let i = 0; i < accList.length-1; i++) {
        if(accList[i] == acc) {
            const createdAcc = await prisma.recommend.upsert({
                where:{name : acc},
                update: {},
                create: {
                  name : acc,
                  temperature : temperature,
                  weather : sky == 0 ? String(sky) : String(pyt+4),
                  c_type : "소품",
                  img_url : ""
                },
              });
        }
    }

    res.sendStatus(204);
    

});



module.exports = router;