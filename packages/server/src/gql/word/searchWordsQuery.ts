import { IGQLQuery, IGQLSchema } from '../interfaces';
import { wordModel } from '../../mongo/wordModel';
import { languageModel } from '../../mongo/languageModel';
import { wordType } from './wordType';

const outputName = 'SearchWordsOutput';
export const searchWordsOutput: IGQLSchema = {
    name: outputName,
    schema: `
        type ${outputName} {
            words: [${wordType.name}]
        }
    `,
};

export interface IWordsFilterInput {
    language: string;
    text?: string;
    limit?: number;
}

const inputName = 'SearchWordsInput';
export const searchWordsInput: IGQLSchema = {
    name: inputName,
    schema: `
        input ${inputName} {
            language: String!
            text: String
            limit: Int
        }
    `,
};

const name = 'searchWords';
export const searchWordsQuery: IGQLQuery = {
    name,
    query: `
        ${name}(filter: ${searchWordsInput.name}!): ${searchWordsOutput.name}
    `,
    resolver: async (obj: any, { filter }: { filter: IWordsFilterInput }) => {
        const { language, text, limit = 0 } = filter;
        const foundLanguage = (await languageModel.Model.findOne({
            code: language,
        }));

        if (!foundLanguage) return { words: [] };

        const foundWords = await wordModel.Model
            .find({
                language: foundLanguage._id,
                ...(text ? { text } : {}),
            })
            .limit(limit);

        return { words: foundWords };
    },
};
