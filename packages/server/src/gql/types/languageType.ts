import { IGQLSchema} from '../interfaces';

const name = 'Language';

export const languageType: IGQLSchema = {
    name,
    schema: `
        type ${name} {
            id: String
            code: String
            name: String
        }
    `,
};
