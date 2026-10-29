// @ts-expect-error PrismaClient is provided by the generated Prisma client.
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prismaClient = globalForPrisma.prisma || new PrismaClient()

globalForPrisma.prisma = prismaClient