const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchCommentsWithWeather() {
  try {
    const commentsWithWeather = await prisma.recommend.findMany({
      where: {
        weather: {
          equals: "1"
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