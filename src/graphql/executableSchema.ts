import 'graphql-import-node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './resolvers'
import mainSchema from './schema.graphql'

const schema = makeExecutableSchema({
  typeDefs: [ mainSchema ],
  resolvers
})

export default schema