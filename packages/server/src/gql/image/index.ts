import { imageType } from './imageType';
import { addImageMutation, addImageOutput } from './addImageMutation';
import { editImageMutation } from './editImageMutation';
import { deleteImageMutation } from './deleteImageMutation';
import { searchImagesQuery, searchImagesOutput, searchImagesInput } from './searchImagesQuery';
import { searchImagesByWordQuery, searchImagesByWordInput } from './searchImagesByWordQuery';

export const imageSchema = `
    ${imageType.schema}
    ${addImageOutput.schema}
    ${searchImagesOutput.schema}
    ${searchImagesInput.schema}
    ${searchImagesByWordInput.schema}
`;

export const imageMutationSchema = `
    ${addImageMutation.mutation}
    ${editImageMutation.mutation}
    ${deleteImageMutation.mutation}
`;

export const imageMutationResolvers = {
    [addImageMutation.name]: addImageMutation.resolver,
    [editImageMutation.name]: editImageMutation.resolver,
    [deleteImageMutation.name]: deleteImageMutation.resolver,
};

export const imageQuerySchema = `
    ${searchImagesQuery.query}
    ${searchImagesByWordQuery.query}
`;

export const imageQueryResolvers = {
    [searchImagesQuery.name]: searchImagesQuery.resolver,
    [searchImagesByWordQuery.name]: searchImagesByWordQuery.resolver,
};
