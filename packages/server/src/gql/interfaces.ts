export interface IGQLSchema {
    name: string;
    schema: string;
}

export interface IGQLQuery {
    name: string;
    query: string;
    resolver: (...params: any[]) => void;
}
