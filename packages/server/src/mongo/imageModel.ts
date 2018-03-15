import { Schema, model } from 'mongoose';

const name = 'Image';

export const imageModel = {
    name,
    Model: model(name, new Schema({
        url: String,
    })),
};
