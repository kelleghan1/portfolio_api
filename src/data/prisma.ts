import portfolioItemArray from '../utils/portfolioData'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < portfolioItemArray.length; i++) {
    const {
      name,
      projectId,
      homeImage,
      primaryImage,
      categories,
      githubLinks,
      productLinks,
      description,
      images
    } = portfolioItemArray[i]

    await prisma.portfolioItem.upsert({
      where: { projectId },
      update: {},
      create: {
        categories: {
          connectOrCreate: categories.map(category => ({
            where: { name: category },
            create: { name: category }
          }))
        },
        name,
        homeImage: {
          connectOrCreate: {
            where: { url: homeImage },
            create: { url: homeImage }
          }
        },
        primaryImage: {
          connectOrCreate: {
            where: { url: primaryImage },
            create: { url: primaryImage }
          }
        },
        projectId,
        description,
        images: {
          connectOrCreate: images.map(url => ({
            where: { url },
            create: { url }
          }))
        },
        links: {
          connectOrCreate: [
            ...githubLinks.map(({ label, url }) => ({
              where: { url },
              create: {
                type: {
                  connectOrCreate: {
                    where: { name: 'github' },
                    create: { name: 'github' }
                  }
                },
                isInternal: false,
                label,
                url
              }
            })),
            ...productLinks.map(({ isInternal, label, url }) => ({
              where: { url },
              create: {
                type: {
                  connectOrCreate: {
                    where: { name: 'github' },
                    create: { name: 'github' }
                  }
                },
                isInternal,
                label,
                url
              }
            }))
          ]
        }
      }
    })
  }

  const allLinks = await prisma.portfolioItem.findMany()
  console.log(allLinks)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })