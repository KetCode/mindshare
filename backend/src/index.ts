import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import { buildSchema } from "type-graphql"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import { AuthResolver } from './resolvers/auth.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { buildContext } from './graphql/context'
import { IdeaResolver } from './resolvers/idea.resolver'
import { CommentResolver } from './resolvers/comment.resolver'
import { VoteResolver } from './resolvers/vote.resolver'

async function bootstrap() {
    const app = express()

    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))

    const schema = await buildSchema({
        resolvers: [AuthResolver, UserResolver, IdeaResolver, CommentResolver, VoteResolver],
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
        expressMiddleware(server, { context: buildContext })
    )

    app.listen({
        port: 4000,
    }, () => {
        console.log('Servidor iniciado!')
    })
}

bootstrap()