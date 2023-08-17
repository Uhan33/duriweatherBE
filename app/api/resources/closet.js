const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var outerFile = require('../data/outer.json');
var topFile = require('../data/top.json');
var bottomFile = require('../data/bottom.json');
var accFile = require('../data/acc.json');

router.get("/", async (req, res) => {
    const result = await prisma.recommend.findMany();
    res.json(result);
});

const noData = {
  name: "더 많은 데이터를 기반으로 준비중이에요~",
  img_url: "/clothes/balloons.png",
  temperature: "",
  weather: ""
};

router.get("/top", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();
    const skyResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//pty"); // 강수 
    const pyt = await pytResponse.json();

    const top = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "Top"},
                {weather : pyt == 0 ? sky : pyt+4}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
    });

    const ran = Math.floor(Math.random() * top.length);
    if(top.length == 0){
      res.json(noData)
      console.log("해당사항 없음!");
    }
    else{
        res.json(top[ran]);
        console.log(top[ran]);
    }
});

router.get("/sopum", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();
    const skyResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//pty"); // 강수 
    const pyt = await pytResponse.json();

    
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
                {c_type : "Acc"},
                {weather : pyt == 0 ? sky : pyt+4}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
    });

    console.log("sopum => ",sopum);
    const ran = Math.floor(Math.random() * sopum.length);
    if(sopum.length == 0){
        res.json(noData)
        console.log("해당사항 없음!");
    }
    else{
        res.json(sopum[ran]);
        console.log(sopum[ran]);
    }
});

router.get("/pants", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();
    const skyResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//pty"); // 강수 
    const pyt = await pytResponse.json();

    

    const pants = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "Pants"},
                {weather : pyt == 0 ? sky : pyt+4}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
    });

    const ran = Math.floor(Math.random() * pants.length);
    if(pants.length == 0){
        res.json(noData);
        console.log("해당사항 없음!");
    }
    else{
        res.json(pants[ran]);
        console.log(pants[ran]);
    }
});

router.get("/jacket", async (req, res) => {
    const tempResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/ultraSrtNcst//T1H");
    const temperature = await tempResponse.json();
    const skyResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//sky"); // 날씨(맑/흐 등)
    const sky = await skyResponse.json();
    const pytResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//pty"); // 강수 
    const pyt = await pytResponse.json();

   

    const jacket = await prisma.recommend.findMany({
        where:{
            AND : [
                {temperature : {
                    gt : (temperature-2)
                }},
                {temperature : {
                    lte : (temperature+2)
                }},
                {c_type : "Outer"},
                {weather : pyt == 0 ? sky : pyt+4}
            ]
        },
        select: {name:true, img_url:true, temperature:true, weather:true}
    });

    const ran = Math.floor(Math.random() * jacket.length);
    if(jacket.length == 0){
        res.json(noData);
        console.log("해당사항 없음!");
    }
    else{
        res.json(jacket[ran]);
        console.log(jacket[ran]);
    }
    
});

router.post("/", async (req, res) => {
    const outerList = ["패딩", "무스탕", "코트", "플리스/뽀글이", "점퍼", "자켓", "후드집업", "가디건", "없음"];
    const topList = ["니트/스웨터", "후드티셔츠", "맨투맨/스웨트셔츠", "셔츠/블라우스", "긴팔 티셔츠", "반소매 티셔츠", "민소매 티셔츠", "없음"];
    const bottomList = ["데님 팬츠", "코튼 팬츠", "슈트팬츠/슬랙스", "트레이닝/조거 팬츠", "레깅스", "숏 팬츠", "스커트", "원피스", "없음"];
    const accList = ["비니", "볼캡", "우산", "없음"];

    const { outer, top, bottom, acc } = req.body;
    const tempResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/ultraSrtNcst//T1H");
    const skyResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//sky");
    const pytResponse = await fetch("https://duriweatherbe-uhan33-s-team.vercel.app/api/vilageFcst//pty");

    const temperature = await tempResponse.json();
    const sky = await skyResponse.json();
    const pyt = await pytResponse.json();

    let j = 0;

    for(let i = 0; i < outerList.length-1; i++) {
        if(outerList[i] == outer) {
            for(j = 0; j < outerFile.length; j++) {
                if(outerFile[j].ko == outer)
                    break;
            }
            const createdOuter = await prisma.recommend.create({
                data: {
                  name : outerFile[j].en,
                  temperature : temperature,
                  weather : pyt == 0 ? sky : pyt+4,
                  c_type : "Outer",
                  img_url : outerFile[j].url
                },
              });
        }
    }

    for(let i = 0; i < topList.length-1; i++) {
        if(topList[i] == top) {
            for(j = 0; j < topFile.length; j++) {
                if(topFile[j].ko == top)
                    break;
            }
            const createdTop = await prisma.recommend.create({
                data: {
                  name : topFile[j].en,
                  temperature : temperature,
                  weather : pyt == 0 ? sky : pyt+4,
                  c_type : "Top",
                  img_url : topFile[j].url
                },
              });
        }
    }

    for(let i = 0; i < bottomList.length-1; i++) {
        if(bottomList[i] == bottom) {
            for(j = 0; j < bottomFile.length; j++) {
                if(bottomFile[j].ko == bottom)
                    break;
            }
            const createdBottom = await prisma.recommend.create({
                data: {
                  name : bottomFile[j].en,
                  temperature : temperature,
                  weather : pyt == 0 ? sky : pyt+4,
                  c_type : "Bottom",
                  img_url : bottomFile[j].url
                },
              });
        }
    }

    for(let i = 0; i < accList.length-1; i++) {
        if(accList[i] == acc) {
            for(j = 0; j < accFile.length; j++) {
                if(accFile[j].ko == acc)
                    break;
            }
            const createdAcc = await prisma.recommend.create({
                data: {
                  name : accFile[j].en,
                  temperature : temperature,
                  weather : pyt == 0 ? sky : pyt+4,
                  c_type : "Acc",
                  img_url : accFile[j].url
                },
              });
        }
    }

    res.sendStatus(204);
    

});



module.exports = router;