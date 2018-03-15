import { IGQLSchema} from '../interfaces';

const name = 'WordsFilterInput';

export interface IWordsFilterInput {
    language: string;
    text?: string;
    limit?: number;
}

export const wordsFilterInput: IGQLSchema = {
    name,
    schema: `
        input ${name} {
            language: String!
            text: String
            limit: Int
        }
    `,
};
