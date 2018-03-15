import { wordType } from './wordType';
import { searchWordsQuery, searchWordsOutput, searchWordsInput } from './searchWordsQuery';
import { addWordInput, addWordMutation, addWordOutput } from './addWordMutation';
import { editWordInput, editWordMutation } from './editWordMutation';
import { deleteWordMutation } from './deleteWordMutation';

export const wordSchema = `
    ${wordType.schema}
    ${searchWordsInput.schema}
    ${searchWordsOutput.schema}
    ${addWordInput.schema}
    ${addWordOutput.schema}
    ${editWordInput.schema}
`;

export const wordQuerySchema = `
    ${searchWordsQuery.query}
`;

export const wordQueryResolvers = {
    [searchWordsQuery.name]: searchWordsQuery.resolver,
};

export const wordMutationSchema = `
    ${addWordMutation.mutation}
    ${editWordMutation.mutation}
    ${deleteWordMutation.mutation}
`;

export const wordMutationResolvers = {
    [addWordMutation.name]: addWordMutation.resolver,
    [editWordMutation.name]: editWordMutation.resolver,
    [deleteWordMutation.name]: deleteWordMutation.resolver,
};
