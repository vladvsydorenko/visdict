import { IGQLSchema} from '../interfaces';
import { imageType } from './imageType';
import { languageType } from './languageType';

const name = 'Word';

export const wordType: IGQLSchema = {
    name,
    schema: `
        type ${name} {
            id: String
            text: String
            language: ${languageType.name}
            images: [${imageType.name}]
        }
    `,
};
