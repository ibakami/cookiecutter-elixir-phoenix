// @ts-ignore
import * as AbsintheSocket from "@absinthe/socket"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink } from "apollo-link"
import { onError } from "apollo-link-error"
import { HttpLink } from "apollo-link-http"
import { RetryLink } from "apollo-link-retry"
import { withClientState } from "apollo-link-state"
import { WebSocketLink } from "apollo-link-ws"
// @ts-ignore
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link"
import { Socket as PhoenixSocket } from "phoenix"

const GQL_URI = "/graphql"
const WEB_SOCKET_URI = "ws://127.0.0.1:4000/socket"

const cache = new InMemoryCache()

const absintheSocketLink = createAbsintheSocketLink(
  AbsintheSocket.create(new PhoenixSocket("ws://localhost:4000/socket")),
)

console.log("AbsintheSocketLink", absintheSocketLink)

/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
export const apolloLinks = ApolloLink.from([
  onError(({ graphQLErrors, networkError }): void => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }): undefined => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
        return undefined
      })
    if (networkError) console.log(`[Network error]: ${networkError}`)
  }),
  withClientState({
    defaults: {
      isConnected: true,
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (
          _: any,
          { isConnected }: any,
          { thisCache }: any,
        ): null => {
          thisCache.writeData({ data: { isConnected } })
          return null
        },
      },
    },
    cache,
  }),
  new RetryLink({
    attempts: (_count, operation, error): boolean => {
      return !!error && operation.operationName !== "specialCase"
    },
    delay: (count): number => {
      return count * 1000 * Math.random()
    },
  }),
  // new HttpLink({
  //   uri: GQL_URI,
  //   credentials: "same-origin",
  // }),
  // new WebSocketLink({
  //   uri: WEB_SOCKET_URI,
  //   options: {
  //     reconnect: true,
  //   },
  // }),
  createAbsintheSocketLink(
    AbsintheSocket.create(new PhoenixSocket(WEB_SOCKET_URI)),
  ),
])

/* eslint-enable */
