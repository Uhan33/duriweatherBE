const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  /**
   * #swagger.tags = ['user-resource']
   * #swagger.summary = 'User 목록 조회'
   * #swagger.description = '요청한 페이지에 해당하는 User 목록을 조회합니다.'
   */
  const { searchString, skip, take, orderBy } = req.query;

  const or = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      }
    : {};

  const users = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy || undefined,
    },
  });

  res.json(users);
});

module.exports = router;
