const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchCommentsWithWeather() {
  try {
    const commentsWithWeather = await prisma.recommend.findMany({
      where: {
        temperature: {
          equals: 35
        }
      },
      select: {
        name: true
      }
    });

    console.log(commentsWithWeather);
    return commentsWithWeather;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchCommentsWithWeather
};