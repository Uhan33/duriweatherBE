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
    const skyResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//pyt"); // 강수 
    const pyt = await pytResponse.json();

    if(parseInt(pyt) != 0){
	    sky += 4;
    }

    const top = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "상의"},
                {weather : sky}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
    });

    const ran = Math.floor(Math.random() * top.length);
    console.log(top[ran]);
    res.json(top[ran]);
});

router.get("/sopum", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();
    const skyResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//pyt"); // 강수 
    const pyt = await pytResponse.json();

    if(parseInt(pyt) != 0){
	    sky += 4;
    }
    console.log("지금 날씨 : ", sky);
    console.log("지금 기온 : ", temperature);
    console.log("지금 비오니?: ", pyt);
    const sopum = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "소품"},
                {weather : sky}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
    });

    console.log("sopum => ",sopum);
    const ran = Math.floor(Math.random() * sopum.length);
    console.log(sopum[ran]);
    res.json(sopum[ran]);
});

router.get("/pants", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();
    const skyResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//pyt"); // 강수 
    const pyt = await pytResponse.json();

    if(parseInt(pyt) != 0){
	    sky += 4;
    }

    const pants = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "하의"},
                {weather : sky}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
    });

    const ran = Math.floor(Math.random() * pants.length);
    console.log(pants[ran]);
    res.json(pants[ran]);
});

router.get("/jacket", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();
    const skyResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst//pyt"); // 강수 
    const pyt = await pytResponse.json();

    if(parseInt(pyt) != 0){
	    sky += 4;
    }

    const jacket = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "겉옷"},
                {weather : sky}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
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
                  weather : pyt == 0 ? String(sky) : String(pyt+4),
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
                  weather : pyt == 0 ? String(sky) : String(pyt+4),
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
                  weather : pyt == 0 ? String(sky) : String(pyt+4),
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
                  weather : pyt == 0 ? String(sky) : String(pyt+4),
                  c_type : "소품",
                  img_url : ""
                },
              });
        }
    }

    res.sendStatus(204);
    

});



module.exports = router;