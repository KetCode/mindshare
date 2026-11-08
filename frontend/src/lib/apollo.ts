import { useAuthStore } from "@/stores/auth"
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client"
import { SetContextLink } from '@apollo/client/link/context'

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
})

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token
  return {
    header: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink, authLink]),
  cache: new InMemoryCache()
})