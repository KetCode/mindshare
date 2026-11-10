import { gql } from "@apollo/client";

export const COMMENT_IDEA = gql`
    mutation CreateComment($data: CreateCommentInput!, $ideaId: String!) {
        createComment(data: $data, ideaId: $ideaId) {
            id
            content
            authorId
            author {
                id
                name
                email
            }
            ideaId
            idea {
                title
                description
                author {
                    name
                    email
                }
            }
            createdAt
            updatedAt
        }
    }
`