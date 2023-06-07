import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required!'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!'],
    },
    platform: {
        type: String,
        enum: {
            values: ['chatGPT', 'midjourney'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'Platform is required!']
    },
    imageURL: {
        type: String
    }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;