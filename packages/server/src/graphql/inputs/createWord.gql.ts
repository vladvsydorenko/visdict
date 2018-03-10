import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';

export const createWord = new GqlSchema(
    EGqlSchemaType.input,
    `
        input CreateWord {
            text: String!
            ipo: String!
            language: String!
            images: [String]!
        }
    `,
    {}
);
