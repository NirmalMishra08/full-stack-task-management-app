import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // "Appetizer", "Main Course", etc.
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true }
});


export default mongoose.model("Menu", menuSchema);
