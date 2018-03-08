export enum EGqlSchemaType {
    type = 'type',
    input = 'input',
}

export interface IGqlSchemaResolver {
    [key: string]: (...props: any[]) => any;
}

export class GqlSchema {
    public type: EGqlSchemaType;
    public schema: string;
    public resolver: IGqlSchemaResolver;
    public name: string;

    constructor(type: EGqlSchemaType, schema: string, resolver: IGqlSchemaResolver) {
        this.type = type;
        this.schema = schema;
        this.resolver = resolver;
        this.name = this.getName(schema);
    }

    public getName(schema = this.schema) {
        const interSearch = schema.match(this.makeInterSearchRegex());
        if (!interSearch) return null;
        return interSearch[0].replace(this.makeInterSearchCleanRegex(), '');
    }

    private makeInterSearchRegex() {
        return new RegExp(`^\\s*${this.type}[^{]*`);
    }

    private makeInterSearchCleanRegex() {
        return new RegExp(`^\\s*${this.type}\s*|\\s*`, 'gi');
    }
}
