export interface IGQLSchema {
    name: string;
    schema: string;
}

export interface IGQLQuery {
    name: string;
    query: string;
    resolver: (...params: any[]) => void;
}

export interface IGQLMutation {
    name: string;
    mutation: string;
    resolver: (...params: any[]) => void;
}
