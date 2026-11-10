import { gql } from "@apollo/client"

export const CREATE_IDEA = gql`
  mutation CreateIdea($data: CreateIdeaInput!) {
    createIdea(data: $data) {
        id
        title
        description
        authorId
        author {
            id
            name
            email
        }
        countVotes
        createdAt
        updatedAt
    }
  }
`

export const DELETE_IDEA = gql`
  mutation DeleteIdea($id: String!) {
    deleteIdea(id: $id)
  }
`

export const UPDATE_IDEA = gql`
  mutation UpdateIdea($id: String!, $data: UpdateIdeaInput!) {
    updateIdea(id: $id, data: $data) {
      id
      title
      description
      author {
        id
        name
        email
      }
    }
}
`