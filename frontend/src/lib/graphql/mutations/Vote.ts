import { gql } from "@apollo/client"

export const VOTE_IDEA = gql`
    mutation ToggleVote($ideaId: String!) {
        toggleVote(ideaId: $ideaId)
    }
`