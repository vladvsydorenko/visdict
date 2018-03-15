import { Schema, model } from 'mongoose';
import { imageModel } from './imageModel';
import { languageModel } from './languageModel';

const name = 'Word';

export const wordModel = {
    name,
    Model: model(name, new Schema({
        text: String,
        images: [{type: Schema.Types.ObjectId, ref: imageModel.name}],
        language: {type: Schema.Types.ObjectId, ref: languageModel.name},
    })),
};
