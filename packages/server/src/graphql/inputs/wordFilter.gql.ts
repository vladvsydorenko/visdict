import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';

export const wordFilter = new GqlSchema(
    EGqlSchemaType.input,
    `
        input WordFilter {
            language: String!
            text: String
        }
    `,
    {}
);
