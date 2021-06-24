import React from 'react';
// Apollo Client Imports
import {
  split,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret':
        process.browser && `${window._env_.ADMIN_SECRET}`,
    },
  };
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: process.browser && window._env_.DAILYCLOAK_SUBS_URL,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            'x-hasura-admin-secret': `${window._env_.ADMIN_SECRET}`,
          },
        },
      },
    })
  : null;

const httpLink = new HttpLink({
  uri: process.browser && window._env_.DAILYCLOAK_URL,
});

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : httpLink;

const client = new ApolloClient({
  link,
  fetch,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};
