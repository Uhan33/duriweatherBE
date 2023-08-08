const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const result = await prisma.comment.findMany();
    res.json(result);
});

router.get("/today", async (req, res) => {
    const result = await prisma.comment.findUnique({
        where: {num: 999},
        select: {comment: true}
    });
    res.json(result);
});

module.exports = router;