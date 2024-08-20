import mongoose from "mongoose";

const espacioSalonSchema = new mongoose.Schema({
  nombre_esp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  estado: { type: Boolean, default: 1 }
});

export default mongoose.model("EspacioSalon", espacioSalonSchema);
