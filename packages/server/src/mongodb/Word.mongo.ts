import { Schema, model } from 'mongoose';

export const WordSchema = new Schema({
    text: String,
    ipo: String,
    language: String,
    image: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
});

export const Word = model('Word', WordSchema);
