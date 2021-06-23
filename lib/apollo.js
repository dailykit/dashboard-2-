import React from 'react';
// Apollo Client Imports
import {
    split,
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    createHttpLink,
    ApolloProvider as Provider,

} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import { SubscriptionClient } from "subscriptions-transport-ws";


const wssClient = new SubscriptionClient(
    `${process.env.REACT_APP_DAILYCLOAK_SUBS_URL}`,
    {
        reconnect: true,
        connectionParams: {
            headers: {
                "x-hasura-admin-secret": `${process.env.REACT_APP_ADMIN_SECRET}`,
            },
        },
    }
);

const wssLink = new WebSocketLink(wssClient);

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
        headers: {
            ...headers,
            "x-hasura-admin-secret": `${process.env.REACT_APP_ADMIN_SECRET}`,
        },
    }));
    return forward(operation);
});

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_DAILYCLOAK_URL}`,
});

const splitLink = process.browser ? split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wssLink,
    authLink.concat(httpLink)
) : httpLink

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});
export const ApolloProvider = ({ children }) => {
    return <Provider client={client}>{children}</Provider>
}