const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  remainCal: {
    type: Number
  },

  restrictions: {
    type: [String],
    required: true
  },

  foodHistory: {
    type: [String]
  },

  macros: [
    {
      currentCal: {
        type: Number
      },
      sodium: {
        type: Number
      },
      sugar: {
        type: Number
      },
      protein: {
        type: Number
      },
      carbs: {
        type: Number
      },
      fat: {
        type: Number
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
