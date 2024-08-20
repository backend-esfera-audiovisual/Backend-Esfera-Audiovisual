import mongoose from "mongoose";

const ambienteSalonSchema = new mongoose.Schema({
  nombre_amb: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  estado: { type: Boolean, default: 1 }
});

export default mongoose.model("AmbienteSalon", ambienteSalonSchema);
