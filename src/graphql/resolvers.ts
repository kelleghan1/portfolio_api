import { LinkTypes } from '../types/types'
import { Resolvers } from '../types/generatedTypes'

const resolvers: Resolvers = {
  Query: {
    links: (_parent, _args, context) => context.prisma.link.findMany({ include: { type: true } }),
    linkTypes: (_parent, _args, context) => context.prisma.linkType.findMany(),
    categories: (_parent, _args, context) => context.prisma.category.findMany(),
    projectImages: (_parent, _args, context) => context.prisma.projectImage.findMany(),
    products: (_parent, _args, context) => context.prisma.product.findMany(),
    portfolioItems: (_parent, _args, context) => context.prisma.portfolioItem.findMany({
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
        projectImages: true,
        primaryImage: true,
        homeImage: true,
        categories: true
      }
    })
  },
  PortfolioItem: {
    githubLinks: parent => parent.links.filter(link => link.type.name === LinkTypes.Github),
    productLinks: parent => parent.links.filter(link => link.type.name === LinkTypes.Product)
  }
}

export default resolvers