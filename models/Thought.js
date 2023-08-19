const { Schema, model } = require('mongoose');
const {format_date} = require('../utils/helpers');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim:true,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: date => format_date(date),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function(){return this.reactions.length});
const Thought = model('thought', thoughtSchema);


module.exports = Thought;
