import { Types } from 'mongoose';
import { IGQLMutation, IGQLSchema } from '../interfaces';
import { wordType } from './wordType';
import { wordModel } from '../../mongo/wordModel';

const inputName = 'AddWordInput';
export const addWordInput: IGQLSchema = {
    name: inputName,
    schema: `
        input ${inputName} {
            text: String!
            language: String!
            images: [String]
        }
    `,
};

const outputName = 'AddWordOutput';
export const addWordOutput: IGQLSchema = {
    name: outputName,
    schema: `
        type ${outputName} {
            success: Boolean
            erroCode: Int
            word: ${wordType.name}
        }
    `,
};

interface IAddWordMutationProps {
    word: {
        text: string;
        language: string;
        images?: string[];
    };
}

const name = 'addWord';
export const addWordMutation: IGQLMutation = {
    name,
    mutation: `
        ${name}(word: ${addWordInput.name}): ${addWordOutput.name}
    `,
    resolver: async (obj, { word }: IAddWordMutationProps) => {
        const { text, language, images = [] } = word;
        const createdWord = (await wordModel.Model.create({
            text,
            language: new Types.ObjectId(language),
            images: images.map(id => new Types.ObjectId(id)),
        }));

        if (!createdWord) {
            return {
                success: false,
                word: null,
            };
        }

        const populatedWord = (await
            wordModel.Model
                .findOne({
                    _id: createdWord._id,
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
