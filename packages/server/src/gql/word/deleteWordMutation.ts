import { IGQLMutation } from '../interfaces';
import { wordModel } from '../../mongo/wordModel';
import { addWordOutput } from './addWordMutation';

const ERROR_CODE_NOT_FOUND = 404;

const name = 'deleteWord';
export const deleteWordMutation: IGQLMutation = {
    name,
    mutation: `
        ${name}(id: String!): ${addWordOutput.name}
    `,
    resolver: async (obj, { id }: { id: string }) => {
        const foundWord = await wordModel.Model.findById(id);

        if (!foundWord) {
            return {
                success: false,
                errorCode: ERROR_CODE_NOT_FOUND,
                word: null,
            };
        }

        const populatedWord = (await
            wordModel.Model
                .findOne({
                    _id: foundWord._id,
                })
                .populate('language')
                .populate('images')
                .exec()
        );

        const deletedWord = await foundWord.remove();

        if (!deletedWord) {
            return {
                success: false,
                word: null,
            };
        }

        return {
            success: true,
            word: populatedWord,
        };
    },
};
