import { Schema, model } from 'mongoose';

const name = 'Language';

export const languageModel = {
    name,
    Model: model(name, new Schema({
        code: String,
        name: String,
    })),
};
