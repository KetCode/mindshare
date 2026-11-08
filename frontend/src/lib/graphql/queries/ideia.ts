import { gql } from "@apollo/client";

export const LIST_IDEIAS = gql`
    query ListIdeias {
        listIdeas {
            id
            title
            description
            authorId
            author {
                id
                name
                email
            }
            comments {
                id
                ideaId
                authorId
                author {
                    id
                    name
                    email
                }
                content
                createdAt
                updatedAt    
            }
            votes {
                id
                userId
            }
            countVotes
            createdAt
            updatedAt
        }
    }
`

export const GET_IDEA = gql`
    query GetIdea($ideaId: String!) {
        getIdea(id: $ideaId) {
            id
            title
            description
            authorId
            author {
                id
                name
                email
            }
            comments {
                id
                ideaId
                authorId
                author {
                    id
                    name
                    email
                }
                content
                createdAt
                updatedAt    
            }
            votes {
                id
                userId
            }
            countVotes
            createdAt
            updatedAt
        }
    }
`