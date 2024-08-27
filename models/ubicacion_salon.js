import mongoose from "mongoose";

const ubicacionSalonSchema = new mongoose.Schema({
  nombre_ubi: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  estado: { type: Boolean, default: 1 }
});

export default mongoose.model("UbicacionSalon", ubicacionSalonSchema);
