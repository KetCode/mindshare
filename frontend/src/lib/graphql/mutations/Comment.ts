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

export const UPDATE_COMMENT = gql`
    mutation UpdateComment($data: UpdateCommentInput!, $id: String!) {
        updateComment(data: $data, id: $id) {
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

export const DELETE_COMMENT = gql`
    mutation DeleteComment($id: String!) {
        deleteComment(id: $id)
    }
`