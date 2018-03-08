import { GqlSchema, IGqlSchemaResolver } from './GglSchema';

export interface IComposedSchemas {
    typeDefs: string;
    resolvers: { [key: string]: IGqlSchemaResolver };
}

export const composeSchemas = (schemas: GqlSchema[]): IComposedSchemas => {
    return schemas.reduce((prev, schema) => {
        const resolver = Object.keys(schema.resolver).length > 0 ? {
            [schema.name]: schema.resolver,
        } : {};

        return {
            typeDefs: `${prev.typeDefs}\n${schema.schema}`,
            resolvers: Object.assign({}, prev.resolvers, resolver),
        };
    }, {
        typeDefs: '',
        resolvers: {},
    });
};
