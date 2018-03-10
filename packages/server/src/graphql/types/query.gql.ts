import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';
import { wordFilter } from '../inputs/wordFilter.gql';
import { word } from './word.gql';
import { Word } from '../../mongodb/Word.mongo';

export const query = new GqlSchema(
    EGqlSchemaType.type,
    `
        type Query {
            words(filter: ${wordFilter.name}): [${word.name}]
        }
    `,
    {
        words: async (obj: any, { filter }: any) => {
            return (await Word.find(filter))
                .map(({ _id, text, ipo, language, images }: any) => ({
                    id: _id, text, ipo, language, images,
                }));
        },
    }
);
