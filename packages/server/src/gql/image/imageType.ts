import { IGQLSchema} from '../interfaces';

const name = 'Image';

export const imageType: IGQLSchema = {
    name,
    schema: `
        type ${name} {
            id: String
            url: String
        }
    `,
};
