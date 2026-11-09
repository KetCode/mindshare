import { prismaClient } from "../../prisma/prisma";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { UserModel } from "../models/user.model";
import { comparePassword, hasPassword } from "../utils/hash";
import { signJwt, verifyJwt } from "../utils/jwt";

export class AuthService {
    async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (!existingUser) throw new Error('Usuário não encontrado!')

        const compare = await comparePassword(data.password, existingUser.password)
        if (!compare) throw new Error('Senha incorreta!')

        return this.generateTokens(existingUser)
    }

    async register(data: RegisterInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (existingUser) throw new Error('E-mail já cadastrado!')

        const hash = await hasPassword(data.password)
        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash
            }
        }) 
        return this.generateTokens(user)
    }

    generateTokens(user: UserModel){
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = signJwt({ ...payload, tokenType: "access" }, '15m', process.env.JWT_SECRET!)
        const refreshToken = signJwt({ ...payload, tokenType: "refresh" }, '1d', process.env.JWT_REFRESH_SECRET!)
        return { token, refreshToken, user }
    }

    async refreshToken(refreshToken: string) {
        try {
            const decoded = verifyJwt(
                refreshToken,
                process.env.JWT_REFRESH_SECRET!
            )

            if (decoded.tokenType !== "refresh") {
                throw new Error("Token inválido")
            }

            const user = await prismaClient.user.findUnique({
                where: { id: decoded.id }
            })

            if (!user) {
                throw new Error("Usuário não encontrado")
            }

            const token = signJwt(
                {
                    id: user.id,
                    email: user.email,
                    tokenType: "access"
                },
                "15m",
                process.env.JWT_SECRET!
            )

            return token

        } catch {
            throw new Error("Refresh token inválido ou expirado")
        }
    }
}