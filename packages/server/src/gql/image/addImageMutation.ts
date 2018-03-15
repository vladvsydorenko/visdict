import { IGQLMutation, IGQLSchema } from '../interfaces';
import { imageType } from './imageType';
import { imageModel } from '../../mongo/imageModel';

const outputName = 'AddImageOutput';
export const addImageOutput: IGQLSchema = {
    name: outputName,
    schema: `
        type ${outputName} {
            success: Boolean
            erroCode: Int
            image: ${imageType.name}
        }
    `,
};

const name = 'addImage';
export const addImageMutation: IGQLMutation = {
    name,
    mutation: `
        ${name}(url: String!): ${addImageOutput.name}
    `,
    resolver: async (obj, { url }: { url: string}) => {
        const image = (await imageModel.Model.create({
            url,
        }));

        if (!image) {
            return {
                success: false,
                image: null,
            };
        }

        return {
            success: true,
            image,
        };
    },
};
