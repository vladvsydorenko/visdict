import { IGQLMutation } from '../interfaces';
import { imageModel } from '../../mongo/imageModel';
import { addImageOutput } from './addImageMutation';

const ERROR_CODE_NOT_FOUND = 404;

const name = 'editImage';
export const editImageMutation: IGQLMutation = {
    name,
    mutation: `
        ${name}(id: String!, url: String!): ${addImageOutput.name}
    `,
    resolver: async (obj, { id, url }: { id: string, url: string }) => {
        const foundImage = await imageModel.Model.findById(id);

        if (!foundImage) {
            return {
                success: false,
                errorCode: ERROR_CODE_NOT_FOUND,
                word: null,
            };
        }

        foundImage.set('url', url);
        const updateImage = await foundImage.save();

        if (!updateImage) {
            return {
                success: false,
                word: null,
            };
        }

        return {
            success: true,
            image: updateImage,
        };
    },
};
