import 'graphql-import-node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './graphql/resolvers/resolvers'
import mainSchema from './graphql/types/schema.graphql'

const schema = makeExecutableSchema({
  typeDefs: [ mainSchema ],
  resolvers
})

export default schema