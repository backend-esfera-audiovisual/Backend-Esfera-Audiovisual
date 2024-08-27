import mongoose from "mongoose";

const tipoSalonSchema = new mongoose.Schema({
  nombre_tip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  estado: { type: Boolean, default: 1 }
});

export default mongoose.model("TipoSalon", tipoSalonSchema);
