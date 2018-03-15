import { IGQLMutation } from '../interfaces';
import { imageModel } from '../../mongo/imageModel';
import { addImageOutput } from './addImageMutation';

const ERROR_CODE_NOT_FOUND = 404;

const name = 'deleteImage';
export const deleteImageMutation: IGQLMutation = {
    name,
    mutation: `
        ${name}(id: String!): ${addImageOutput.name}
    `,
    resolver: async (obj, { id }: { id: string }) => {
        const foundImage = await imageModel.Model.findById(id);

        if (!foundImage) {
            return {
                success: false,
                errorCode: ERROR_CODE_NOT_FOUND,
                word: null,
            };
        }

        const deletedWord = await foundImage.remove();

        if (!deletedWord) {
            return {
                success: false,
                word: null,
            };
        }

        return {
            success: true,
            image: foundImage,
        };
    },
};
