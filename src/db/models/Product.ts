import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category" },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", schema);

export default Product;
