import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';
import { wordFilter } from '../inputs/WordFilter.gql';
import { word } from './Word.gql';

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
