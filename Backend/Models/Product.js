const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is mandatory!"],
      trim: true,
      maxLength: [200, "Name should not be more than 200 characters"],
    },
    description: { type: String, required: [true, "Description is mandatory"] },
    price: { type: Number, required: [true, "Price is mandatory"], min: 0 },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ["Footwear", "Clothing", "Electronics", "Books", "Bags", "Other"],
    },
    stock: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);