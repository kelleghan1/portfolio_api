import { Resolvers } from './generatedTypes'

const resolvers: Resolvers = {
  Query: {
    links: async (parent, args, context) => await context.prisma.link.findMany({ include: { type: true } }),
    linkTypes: async (parent, args, context) => await context.prisma.linkType.findMany(),
    categories: async (parent, args, context) => await context.prisma.category.findMany(),
    images: async (parent, args, context) => await context.prisma.image.findMany(),
    products: async (parent, args, context) => await context.prisma.product.findMany(),
    portfolioItems: async (parent, args, context) =>
      await context.prisma.portfolioItem.findMany({
        include: {
          products: true,
          links: {
            select: {
              id: true,
              url: true,
              label: true,
              type: true,
              isInternal: true
            }
          },
          images: true,
          primaryImage: true,
          homeImage: true,
          categories: true
        }
      })
  }
  // Link: {
  //   async type(parent, args, context) {
  //     console.log('PARENT', parent)
  //     return await context.prisma.linkType.findUnique({ where: { id: parent.linkTypeId } })
  //   }
  // }
}

export default resolvers