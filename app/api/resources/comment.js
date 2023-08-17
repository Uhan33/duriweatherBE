const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const result = await prisma.comment.findMany();
    res.json(result);
});

router.get("/today", async (req, res) => {
    const pmResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/pm10/grade");
    const skyResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst/sky");
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst/pty");

    let select = 0;
    const pm = await pmResponse.json();
    const sky = await skyResponse.json();
    const pyt = await pytResponse.json(); 

    if(Number(pyt) == 0) {
        select = Number(sky);
    }
    else {
        select = Number(pyt) + 4;   //DB에선 구분을 위해 강수 코드(1,2,3,4) 에 + 4를 할 예정(5,6,7,8)
    }

    const result = await prisma.comment.findMany({
        where: {weather: String(select),
                pm: String(pm)},
        select: {comment: true}
    });
    const randomIndex1 = Math.floor(Math.random() * result.length);
    const randomIndex2 = Math.floor(Math.random() * result.length);

    var rIndex = [
        { "comment1" : result[randomIndex1].comment },
        { "comment2" : result[randomIndex2].comment }
    ]

    console.log(result.length, randomIndex1);

    if (result == null) {
        res.send("오늘 날씨에 추천드릴게 아직 없네요..")
    }
    else {
        res.send(rIndex);
    }
    
});

module.exports = router;