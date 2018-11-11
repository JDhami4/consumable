const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  caloricGoal: {
    type: Number,
    required: true
  },

  restrictions: {
    type: [String],
    required: true
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
  ],
  foodHistory: {
    type: [String]
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
