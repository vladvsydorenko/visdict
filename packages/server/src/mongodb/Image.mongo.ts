import { Schema, model } from 'mongoose';

export const ImageSchema = new Schema({
    url: String,
});

export const Image = model('Image', ImageSchema);
