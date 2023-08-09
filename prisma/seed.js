const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })

  const resultData = [
    {
      num : 997,
      weather: "3",
      pm: "1",
      comment: "미세먼지 없는 날! 밖으로 나가볼까요?"
    },
    {
      num : 998,
      weather: "3",
      pm: "1",
      comment: "미세먼지 걱정은 안해도 되겠네요!"
    },
    {
      num : 996,
      weather: "1",
      pm: "1",
      comment: "날씨도 화창하고 미세먼지도 없는데 빨래는 어떠세요?"
    }
  ];

  const comm = await prisma.$transaction(
    resultData.map((comment) =>
      prisma.comment.upsert({
        where: {num: comment.num},
        update: {},
        create: {
          num: comment.num,
          weather: comment.weather,
          pm: comment.pm,
          comment: comment.comment
        }
      })
    )
  );
  console.log({ alice, bob, comm })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })