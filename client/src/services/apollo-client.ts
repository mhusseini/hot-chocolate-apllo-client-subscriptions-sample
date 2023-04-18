import {ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject, split} from "@apollo/client/core";
import {TypePolicies} from "@apollo/client/cache/inmemory/policies";
import {removeTypenameFromMutationLink} from 'apollo-remove-typename-mutation-link';
import {provide} from "vue";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {InjectionKey} from "@vue/runtime-core";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {FragmentDefinitionNode, OperationDefinitionNode} from "graphql/language";

export function createApolloClient(uri = 'http://localhost:5117/graphql') {
    const httpLink = new HttpLink({
        uri
    });
    const wsLink = new GraphQLWsLink(createClient({
        url: uri
            .replace(/^http:/i, 'ws:')
            .replace(/^https:/i, 'wss:'),
    }));
    const splitLink = split(
        op => isSubscriptionDocument(getMainDefinition(op.query)),
        wsLink,
        httpLink,
    );
    return new ApolloClient({
        link: from([
            removeTypenameFromMutationLink,
            splitLink]),
        cache: new InMemoryCache({
            canonizeResults: true
        }),
        connectToDevTools: true,
    });
}

export function provideApolloClient(
    uri: string | undefined = undefined,
    key: InjectionKey<ApolloClient<NormalizedCacheObject>> | string | number = DefaultApolloClient) {
    provide(key, createApolloClient(uri));
}

function isSubscriptionDocument(definition: OperationDefinitionNode | FragmentDefinitionNode) {
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    );
}