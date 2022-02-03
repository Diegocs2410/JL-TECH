const { Schema, model } = require("mongoose");

const PurchaseSchema = new Schema({
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Purchase", PurchaseSchema);
