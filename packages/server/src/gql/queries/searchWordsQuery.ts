import { IGQLQuery } from '../interfaces';
import { wordsFilterInput, IWordsFilterInput } from '../input/wordsFilterInput';
import { searchWordsOutput } from '../output/searchWordsOutput';

import { wordModel } from '../../mongo/wordModel';
import { languageModel } from '../../mongo/languageModel';

const name = 'searchWords';

export const searchWordsQuery: IGQLQuery = {
    name,
    query: `
        ${name}(filter: ${wordsFilterInput.name}): ${searchWordsOutput.name}
    `,
    resolver: async (obj: any, { filter }: { filter: IWordsFilterInput }) => {
        const { language, text, limit } = filter;
        const foundLanguage = (await languageModel.Model.findOne({
            code: language,
        }));

        if (!foundLanguage) return { words: [] };

        const wordsQuery = wordModel.Model.find({
            language: foundLanguage._id,
            ...(text ? { text } : {}),
        });

        const limitedQuery = limit ? wordsQuery.limit(limit) : wordsQuery;

        const foundWords = (await limitedQuery.exec());

        return { words: foundWords };
    },
};
