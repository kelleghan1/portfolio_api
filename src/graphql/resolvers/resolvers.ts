import { getPortfolioData } from '../../data/data'

const resolvers = {
  Query: {
    portfolioItemLinks() {
      return []
    },
    portfolioItems() {
      return getPortfolioData()
    }
  }

}

export default resolvers