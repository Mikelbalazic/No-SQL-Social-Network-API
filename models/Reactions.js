const { Schema, Types } = require('mongoose');
const  dateFormat  = require('../utils/dateFormat');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            validate: [/\b\w{2,280}\b/, "Reactions must be more than 1 and less than 280 characters"]
            
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
);

module.exports = reactionSchema;