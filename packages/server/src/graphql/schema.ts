import { makeExecutableSchema } from 'graphql-tools';
import { composeSchemas } from '@visdict/server-util-gql';

import { wordFilter } from './inputs/wordFilter.gql';
import { createWord } from './inputs/createWord.gql';
import { query } from './types/query.gql';
import { word } from './types/word.gql';
import { image } from './types/image.gql';
import { mutation } from './types/mutation.gql';

const composedSchemas = composeSchemas([
    wordFilter,
    createWord,
    query,
    word,
    image,
    mutation,
]);

export const schema = makeExecutableSchema(
    {
        typeDefs:
        `
            ${composedSchemas.typeDefs}
            schema {
                mutation: Mutation
                query: Query
            }
        `,
        resolvers: {
            ...composedSchemas.resolvers,
        },
    }
);
