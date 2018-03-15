import { IGQLSchema} from '../interfaces';
import { wordType } from '../types/wordType';

const name = 'SearchWordsOutput';

export const searchWordsOutput: IGQLSchema = {
    name,
    schema: `
        type ${name} {
            words: [${wordType.name}]
        }
    `,
};
