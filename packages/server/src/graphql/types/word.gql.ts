import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';
import { image } from './image.gql';

export const word = new GqlSchema(
    EGqlSchemaType.type,
    `
        type Word {
            text: String
            ipo: String
            language: String
            images: [${image.name}]
        }
    `,
    {}
);
