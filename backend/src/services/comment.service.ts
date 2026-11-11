import { prismaClient } from "../../prisma/prisma";
import { CreateCommentInput, UpdateCommentInput } from "../dtos/input/comment.input";

export class CommentService {
    async create(
        ideaId: string,
        authorId: string,
        data: CreateCommentInput,
    ) {
        const findIdea = await prismaClient.idea.findUnique({
            where: { id: ideaId },
        });

        if (!findIdea) throw new Error("Idea not found")
        return prismaClient.comment.create({
            data: {
                ideaId,
                authorId,
                content: data.content,
            },
        });
    }

    async listCommentsByIdea(ideaId: string) {
        return prismaClient.comment.findMany({
            where: { ideaId },
        });
    }

    async deleteComment(id: string, authorId: string) {
        const comment = await prismaClient.comment.findUnique({
            where: { id }
        });

        if (!comment) throw new Error("Comentário não encontrado.");
        if (comment.authorId !== authorId) throw new Error("Você não tem permissão para excluir este comentário.");

        return prismaClient.comment.delete({
            where: { id }
        });
    }

    async updateComment(id: string, authorId: string, data: UpdateCommentInput) {
        const comment = await prismaClient.comment.findUnique({
            where: { id }
        });

        if (!comment) throw new Error("Comentário não encontrado.");
        if (comment.authorId !== authorId) throw new Error("Você não tem permissão para editar este comentário.");

        return prismaClient.comment.update({
            where: { id },
            data: {
                content: data.content,
            }
        });
    }
}