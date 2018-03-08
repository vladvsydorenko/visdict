import { GqlSchema, EGqlSchemaType } from '@visdict/server-util-gql';

export const image = new GqlSchema(
    EGqlSchemaType.type,
    `
        type Image {
            id: String
            url: String
        }
    `,
    {}
);
