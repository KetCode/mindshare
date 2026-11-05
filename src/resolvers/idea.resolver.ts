import { Arg, Mutation, Resolver } from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { CreateIdeaInput } from "../dtos/input/idea.input";
import { IdeaService } from "../services/idea.service";

@Resolver(() => IdeaModel)
export class IdeaResolver {
    private ideaService = new IdeaService()
    
    @Mutation(() => IdeaModel)
    async createIdea( @Arg('data') data: CreateIdeaInput ):Promise<IdeaModel> {
        return this.ideaService.createIdea(data, 'authorId');
    }
}