const { Schema, Types } = require('mongoose');
const {format_date} = require('../utils/helpers');

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    _id: false,
  }
);

module.exports = reactionSchema;
