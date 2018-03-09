import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';
import { wordFilter } from '../inputs/wordFilter.gql';
import { word } from './word.gql';

export const query = new GqlSchema(
    EGqlSchemaType.type,
    `
        type Query {
            words(filter: ${wordFilter.name}): [${word.name}]
        }
    `,
    {
        words: () => [
            {
                text: 'Ragazza',
                ipo: 'ragazza',
                language: 'Italian',
                images: [],
            },
        ],
    }
);
