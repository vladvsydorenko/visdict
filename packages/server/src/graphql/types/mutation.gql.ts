import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';
import { Types } from 'mongoose';
import { createWord } from '../inputs/createWord.gql';
import { word as wordGql } from './word.gql';
import { Word } from '../../mongodb/Word.mongo';

export const mutation = new GqlSchema(
    EGqlSchemaType.type,
    `
        type Mutation {
            createWord(word: ${createWord.name}): ${wordGql.name}
        }
    `,
    {
        createWord: async (obj: any, { word }: any) => {
            const id = new Types.ObjectId();
            const { text, ipo, language, images } = (await Word.create([
                {
                    _id: id,
                    text: word.text,
                    ipo: word.ipo,
                    language: word.language,
                    images: word.images,
                },
            ])) as any;
            return {
                id,
                text,
                ipo,
                language,
                images,
            };
        },
    }
);
