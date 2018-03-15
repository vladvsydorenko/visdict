import { makeExecutableSchema } from 'graphql-tools';

// inputs
import { wordsFilterInput } from './input/wordsFilterInput';

// outputs
import { searchWordsOutput } from './output/searchWordsOutput';

// types
import { wordType } from './types/wordType';
import { languageType } from './types/languageType';
import { imageType } from './types/imageType';

// queries
import { searchWordsQuery } from './queries/searchWordsQuery';

const typeDefs = `
    ${wordsFilterInput.schema}

    ${searchWordsOutput.schema}

    ${wordType.schema}
    ${languageType.schema}
    ${imageType.schema}

    type Query {
        ${searchWordsQuery.query}
    }

    schema {
        query: Query
    }
`;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            [searchWordsQuery.name]: searchWordsQuery.resolver,
        },
    },
});
