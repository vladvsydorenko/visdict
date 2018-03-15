import { makeExecutableSchema } from 'graphql-tools';

import {
    wordSchema,
    wordQuerySchema,
    wordQueryResolvers,
    wordMutationSchema,
    wordMutationResolvers,
} from './word';

import {
    imageSchema,
    imageMutationSchema,
    imageMutationResolvers,
    imageQuerySchema,
    imageQueryResolvers
} from './image';

import { languageSchema } from './language';

const typeDefs = `
    ${wordSchema}
    ${imageSchema}
    ${languageSchema}

    type Query {
        ${wordQuerySchema}
        ${imageQuerySchema}
    }

    type Mutation {
        ${imageMutationSchema}
        ${wordMutationSchema}
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            ...wordQueryResolvers,
            ...imageQueryResolvers,
        },
        Mutation: {
            ...imageMutationResolvers,
            ...wordMutationResolvers,
        },
    },
});
