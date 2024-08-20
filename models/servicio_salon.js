import mongoose from "mongoose";

const servicioSalonSchema = new mongoose.Schema({
  nombre_serv: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  estado: { type: Boolean, default: 1 },
});

export default mongoose.model("ServicioSalon", servicioSalonSchema);
