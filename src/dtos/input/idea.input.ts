import { Field, InputType } from "type-graphql";

@InputType()
export class CreateIdeaInput {
    @Field(() => String)
    title!: string

    @Field(() => String, { nullable: true })
    description?: string
}