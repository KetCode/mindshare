import { Field, ID, ObjectType } from "type-graphql";
import { IdeaModel } from "./idea.model";
import { UserModel } from "./user.model";

@ObjectType()
export class VoteModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    userId!: string

    @Field(() => String)
    ideaId!: string

    @Field(() => UserModel)
    user!: UserModel

    @Field(() => IdeaModel)
    idea!: IdeaModel
}