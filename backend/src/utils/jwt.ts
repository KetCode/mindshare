import jwt, { Secret, SignOptions } from "jsonwebtoken"

export type JwtPayload = {
    id: string
    email: string
    tokenType?: "access" | "refresh"
}

export const signJwt = (payload: JwtPayload, expiresIn: string, secret: Secret) => {
    const options: SignOptions = {expiresIn: expiresIn as NonNullable<SignOptions["expiresIn"]>}

    return jwt.sign(payload, secret, options)
}

export const verifyJwt = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload
}
    