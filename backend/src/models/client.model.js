const { Schema, model } = require("mongoose")

const ClientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ],
  },
  contact: {
    type: String,
    required: [true, "Contact is required"],
    trim: true,
  },
  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model("Client", ClientSchema)
