const { Schema, model} = require('mongoose');
const  dateFormat  = require('../utils/dateFormat');
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            validate: [/\b\w{2,280}\b/, "Reactions must be more than 1 and less than 280 characters"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;