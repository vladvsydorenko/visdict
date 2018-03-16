import { Types } from 'mongoose';
import { IGQLQuery, IGQLSchema } from '../interfaces';
import { imageModel } from '../../mongo/imageModel';
import { wordModel } from '../../mongo/wordModel';
import { imageType } from './imageType';
import { searchImagesOutput } from './searchImagesQuery';

const { ObjectId } = Types;

const inputName = 'SearchImagesByWordInput';
export const searchImagesByWordInput: IGQLSchema = {
    name: inputName,
    schema: `
        input ${inputName} {
            text: String!
            limit: Int
        }
    `,
};

interface ISearchImagesByWordQueryProps {
    filter: {
        text: string;
        limit?: number;
    };
}

const name = 'searchImagesByWord';
export const searchImagesByWordQuery: IGQLQuery = {
    name,
    query: `
        ${name}(filter: ${searchImagesByWordInput.name}!): ${searchImagesOutput.name}
    `,
    resolver: async (obj: any, { filter }: ISearchImagesByWordQueryProps) => {
        const { text, limit = 0 } = filter;

        const foundWords = await wordModel.Model
            .find({
                text: {
                    $regex: text,
                },
            })
            .limit(limit);

        const foundImages = await imageModel.Model.find({
            _id: {
                $in: foundWords.reduce((all, word) => all.concat(
                    word.get('images')
                ), []),
            },
        });

        return { images: foundImages };
    },
};
