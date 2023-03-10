import { ApolloServer } from 'apollo-server'
import executableSchema from './graphql/executableSchema'
import { context } from './graphql/context'

export const server = new ApolloServer({
  schema: executableSchema,
  context
})

const port = 4000

server.listen({ port }).then(({ url }: {url: string}) => {
  console.log(`🚀 Server ready at ${url}`)
})