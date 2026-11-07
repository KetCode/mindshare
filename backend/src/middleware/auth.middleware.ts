import { MiddlewareFn } from "type-graphql"
import { GraphQLContext } from "../graphql/context"

export const IsAuth: MiddlewareFn<GraphQLContext> = async ({ context }, next) => {
    if (!context.user) throw new Error('Usuário não autenticado!')
    return next()
}