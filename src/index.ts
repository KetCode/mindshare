import express from 'express'
import { buildSchema } from "type-graphql"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import { AuthResolver } from './resolvers/auth.resolver'

async function bootstrap() {
    const app = express()

    const schema = await buildSchema({
        resolvers: [AuthResolver],
        validate: false,
        emitSchemaFile: './schema.graphql'
    })

    const server = new ApolloServer({
        schema
    })

    await server.start()

    app.use(
        '/graphql',
        express.json(),
        expressMiddleware(server)
    )

    app.listen({
        port: 4000,
    }, () => {
        console.log('Servidor iniciado!')
    })
}

bootstrap()