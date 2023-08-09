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
    const pytResponse = await fetch("https://duriweatherbe-uhan33.vercel.app/api/vilageFcst/pyt")

    let select;
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
        select: {comment: true, num: true}
    });
    res.json(result);
});

module.exports = router;