const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'suhyeon@prisma.io' },
    update: {},
    create: {
      email: 'suhyeon@prisma.io',
      name: 'Suhyeon',
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

/*   const comm1 = await prisma.comment.upsert({
    update: {},
    create: {
        
          num : 999,
          weather: "3",
          pm: "1",
          comment: "날씨는 흐리지만 미세먼지는 좋네요!"
        
    },
    where: {
    },
  }) */



  


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

    
    const createdRecommend = await prisma.Recommend.upsert({
      where:{name : "jeans"},
      update: {},
      create: {
        name : "jeans",
        temperature : 35,
        c_type : "하의",
        img_url : "rururururruru"
      },
    });

/*   const comm = await prisma.comment.createMany({
    data: [
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
      }
    ]
  }) */
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