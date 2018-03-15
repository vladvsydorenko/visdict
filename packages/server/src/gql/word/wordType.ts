import { IGQLSchema} from '../interfaces';
import { imageType } from '../image/imageType';
import { languageType } from '../language/languageType';

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
