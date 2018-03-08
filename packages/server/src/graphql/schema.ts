import { makeExecutableSchema } from 'graphql-tools';
import { composeSchemas } from '@visdict/server-util-gql';

import { wordFilter } from './inputs/wordFilter.gql';
import { query } from './types/query.gql';
import { word } from './types/word.gql';
import { image } from './types/image.gql';

export const schema = makeExecutableSchema(
    composeSchemas([
        wordFilter,
        query,
        word,
        image,
    ])
);
