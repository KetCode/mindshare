import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { CommentModel } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { CreateCommentInput, UpdateCommentInput } from "../dtos/input/comment.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => CommentModel)
export class CommentResolver {
    private commentService = new CommentService()
    private ideaService = new IdeaService()
    private userService = new UserService()
    
    @Mutation(() => CommentModel)
    async createComment(
        @Arg('ideaId', () => String) ideaId: string,
        @Arg('data', () => CreateCommentInput) data: CreateCommentInput,
        @GqlUser() user: User
    ): Promise<CommentModel> {
        return this.commentService.create(ideaId, user.id, data)
    }

    @Mutation(() => CommentModel)
    async updateComment(
        @Arg('id', () => String) id: string,
        @Arg('data', () => UpdateCommentInput) data: UpdateCommentInput,
        @GqlUser() user: User
    ): Promise<CommentModel> {
        return this.commentService.updateComment(id, user.id, data)
    }

    @Mutation(() => Boolean)
    async deleteComment(
        @Arg('id', () => String) id: string,
        @GqlUser() user: User
    ): Promise<boolean> {
        await this.commentService.deleteComment(id, user.id)
        return true
    }

    @FieldResolver(() => IdeaModel)
    async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
        return this.ideaService.findIdeaById(comment.ideaId);
    }

    @FieldResolver(() => UserModel)
    async author(@Root() comment: CommentModel): Promise<UserModel> {
        return await this.userService.findUser(comment.authorId)
    }
}