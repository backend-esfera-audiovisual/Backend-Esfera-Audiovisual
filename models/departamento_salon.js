import mongoose from "mongoose";

const departamentoSalonEventoSchema = new mongoose.Schema({
    nombre_depart: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    estado: { type: Boolean, default: 1 }
});

export default mongoose.model("DepartamentoSalonEvento", departamentoSalonEventoSchema);
