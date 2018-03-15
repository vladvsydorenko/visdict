import { IGQLQuery, IGQLSchema } from '../interfaces';
import { imageType } from './imageType';
import { imageModel } from '../../mongo/imageModel';

const inputName = 'SearchImagesInput';
export const searchImagesInput: IGQLSchema = {
    name: inputName,
    schema: `
        input ${inputName} {
            url: String!
            limit: Int
        }
    `,
};

const outputName = 'SearchImagesOutput';
export const searchImagesOutput: IGQLSchema = {
    name: outputName,
    schema: `
        type ${outputName} {
            images: [${imageType.name}]
        }
    `,
};

interface ISearchImagesQueryProps {
    filter: {
        url: string;
        limit?: number;
    };
}

const name = 'searchImages';
export const searchImagesQuery: IGQLQuery = {
    name,
    query: `
        ${name}(filter: ${searchImagesInput.name}!): ${searchImagesOutput.name}
    `,
    resolver: async (obj: any, { filter }: ISearchImagesQueryProps) => {
        const { url, limit = 0 } = filter;

        const foundImages = await imageModel.Model
            .find({
                url: {
                    $regex: url,
                },
            })
            .limit(limit);

        return { images: foundImages };
    },
};
