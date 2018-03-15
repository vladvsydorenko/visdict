import { Types } from 'mongoose';
import { IGQLMutation, IGQLSchema } from '../interfaces';
import { wordModel } from '../../mongo/wordModel';
import { addWordOutput } from './addWordMutation';

const ERROR_CODE_NOT_FOUND = 404;

const inputName = 'EditWordInput';
export const editWordInput: IGQLSchema = {
    name: inputName,
    schema: `
        input ${inputName} {
            id: String!
            text: String
            language: String
            images: [String]
        }
    `,
};

interface IEditWordMutationProps {
    word: {
        id: string;
        text?: string;
        language?: string;
        images?: string[];
    };
}

const name = 'editWord';
export const editWordMutation: IGQLMutation = {
    name,
    mutation: `
        ${name}(word: ${editWordInput.name}): ${addWordOutput.name}
    `,
    resolver: async (obj, { word }: IEditWordMutationProps) => {
        const { id, text, language, images } = word;

        const foundWord = await wordModel.Model.findById(id);

        if (!foundWord) {
            return {
                success: false,
                errorCode: ERROR_CODE_NOT_FOUND,
                word: null,
            };
        }

        if (typeof text !== 'undefined') foundWord.set('text', text);
        if (typeof language !== 'undefined') foundWord.set('language', new Types.ObjectId(language));
        if (typeof images !== 'undefined') foundWord.set('images', images.map(imageId => new Types.ObjectId(imageId)));

        const updatedWord = await foundWord.save();

        if (!updatedWord) {
            return {
                success: false,
                word: null,
            };
        }

        const populatedWord = (await
            wordModel.Model
                .findOne({
                    _id: updatedWord._id,
                })
                .populate('language')
                .populate('images')
                .exec()
        );

        return {
            success: true,
            word: populatedWord,
        };
    },
};
