import { prismaClient } from "../../prisma/prisma";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";

export class IdeaService {
    async createIdea(data: CreateIdeaInput, authorId: string) {
        return prismaClient.idea.create({
            data: {
                title: data.title,
                description: data.description,
                authorId
            }
        });
    }

    async deleteIdea(id: string) {
        const idea = await prismaClient.idea.findUnique({
            where: { id }
        });

        if (!idea) throw new Error("Idea não encontrada.");

        return prismaClient.idea.delete({
            where: { id }
        });
    }

    async listIdeas() {
        return prismaClient.idea.findMany();
    }

    async updateIdea(id: string, data: UpdateIdeaInput) {
        const idea = await prismaClient.idea.findUnique({
            where: { id }
        });

        if (!idea) throw new Error("Idea não encontrada.");

        return prismaClient.idea.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description
            }
        });
    }
}