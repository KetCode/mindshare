import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    content!: string
}

@InputType()
export class UpdateCommentInput {
    @Field(() => String)
    content!: string
}