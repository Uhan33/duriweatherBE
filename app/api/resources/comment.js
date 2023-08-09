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

    const pm = await pmResponse.json();
    const sky = await skyResponse.json();

    const result = await prisma.comment.findMany({
        where: {weather: String(sky),
                pm: String(pm)},
        select: {comment: true, num: true}
    });
    res.json(result);
});

module.exports = router;